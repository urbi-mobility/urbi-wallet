import * as React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  NavigationScreenProps,
  NavigationEventSubscription
} from "react-navigation";
import {
  generateNewKeystore,
  sign,
  UrbiKeyStore,
  createKeystore
} from "urbi-wallet/util/cryptoUtils";
import { SecureStore, Linking } from "expo";
import { colors } from "Urbi/utils/colors";
import { textStyle as makeTextStyle } from "Urbi/utils/textStyles";
import ButtonPrimary from "Urbi/molecules/buttons/ButtonPrimary";
import { serializeToJson } from "urbi-wallet/util/jsonUtils";
import Spinner from "react-native-loading-spinner-overlay";
import { popup, prompt, popupWithCopy } from "urbi-wallet/util/uiUtils";

const caBaseUrl = "https://urbitunnel.eu.ngrok.io";

type State = {
  address?: string;
  cert: { txUrl: string } | null;
  error?: any;
  focusListener?: NavigationEventSubscription;
  keystore?: UrbiKeyStore | null;
  mnemonic?: string;
  password?: string;
  spinnerMsg: string | null;
  signedJson?: string;
  sortedJson?: string | null;
};

const defaultState = {
  address: "",
  cert: null,
  error: null,
  keystore: null,
  mnemonic: "",
  password: "",
  spinnerMsg: null,
  signedJson: "loading...",
  sortedJson: ""
};

class MainScreen extends React.Component<NavigationScreenProps, State> {
  static navigationOptions = {
    title: "Urbi Wallet"
  };

  constructor(props: NavigationScreenProps) {
    super(props);

    this.addOrEditData = this.addOrEditData.bind(this);
    this.sendToCA = this.sendToCA.bind(this);
    this.withNonce = this.withNonce.bind(this);
    this.deleteEverything = this.deleteEverything.bind(this);
    this.generateKeyStore = this.generateKeyStore.bind(this);
    this.viewCert = this.viewCert.bind(this);
    this.state = defaultState;
  }

  componentDidMount() {
    SecureStore.getItemAsync("cert").then(cert =>
      this.setState({ cert: JSON.parse(cert!) })
    );
    SecureStore.getItemAsync("address").then(address =>
      this.setState({ address: address || "" })
    );
    SecureStore.getItemAsync("data")
      .then(storedData => {
        this.setState({ sortedJson: storedData });

        SecureStore.getItemAsync("mnemonic").then(mnemonicAndPassword => {
          if (mnemonicAndPassword) {
            const split = mnemonicAndPassword.split(":");
            const mnemonic = split[0];
            const password = split.splice(1).join(":");
            this.setState({ mnemonic, password });
          }

          // reload data from SecureStorage every time the page is displayed anew
          this.setState({
            focusListener: this.props.navigation.addListener(
              "willFocus",
              () => {
                SecureStore.getItemAsync("data").then(sortedJson =>
                  this.setState({ sortedJson })
                );
              }
            )
          });
        });
      })
      .catch(err => {
        throw err;
      });
  }

  componentWillUnmount() {
    this.state.focusListener && this.state.focusListener.remove();
  }

  withNonce(storedData: string) {
    const j = JSON.parse(storedData);
    return serializeToJson({
      ...j,
      nonce: Math.ceil(Math.random() * 1e18).toString()
    });
  }

  async sendToCA() {
    const { keystore, mnemonic, password } = this.state;
    let ks = keystore;
    if (!ks) {
      this.setState({ spinnerMsg: "Recovering keystore..." });
      ks = await createKeystore(mnemonic!, password!);
    }
    this.setState({ keystore: ks });
    const payload = this.withNonce(this.state.sortedJson!);
    this.setState({ spinnerMsg: "Signing message..." });
    const signature = sign(ks, payload);
    try {
      const tx = serializeToJson({
        address: ks.address,
        signature,
        payload: JSON.parse(payload)
      });
      this.setState({ spinnerMsg: "Contacting Certification Authority..." });
      const response = await fetch(`${caBaseUrl}/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: tx
      });

      this.setState({ spinnerMsg: null }, async () => {
        if (response.status === 200) {
          SecureStore.setItemAsync("identity", tx).catch(e =>
            popup(`Couldn't store data for validated transaction. ${e}`)
          );

          SecureStore.setItemAsync("data", this.state.sortedJson!).catch(e =>
            popup(`oh no. Oh no no no. Couldn't store signed data. ${e}`)
          );

          const cert = await response.json();

          this.setState({ cert });

          SecureStore.setItemAsync("cert", serializeToJson(cert)).catch(e =>
            popup(`Couldn't store validate transaction. ${e}`)
          );

          popup(JSON.stringify(cert), "Response from the CA");
        } else {
          popup(
            `The CA server replied with a ${response.status} status code :(`
          );
        }
      });
    } catch (error) {
      this.setState({ spinnerMsg: null });
      console.error(error);
    }
  }

  generateKeyStore() {
    generateNewKeystore()
      .then(urbiKeyStore => {
        const { address, mnemonic, password } = urbiKeyStore;
        SecureStore.setItemAsync("mnemonic", `${mnemonic}:${password}`);
        SecureStore.setItemAsync("address", address);
        this.setState({ address, keystore: urbiKeyStore, mnemonic, password });
      })
      .catch(e => this.setState({ error: e }));
  }

  deleteEverything() {
    this.setState(defaultState, () => {
      SecureStore.deleteItemAsync("address");
      SecureStore.deleteItemAsync("cert");
      SecureStore.deleteItemAsync("data");
      SecureStore.deleteItemAsync("identity");
      SecureStore.deleteItemAsync("mnemonic");
    });
  }

  viewCert() {
    Linking.openURL(this.state.cert!.txUrl);
  }

  addOrEditData() {
    const { cert } = this.state;
    if (cert) {
      prompt(
        "Your identity is stored on the blockchain. Editing it will invalidate it. Proceed?",
        "Warning",
        () => {
          SecureStore.deleteItemAsync("cert");
          SecureStore.deleteItemAsync("data");
          SecureStore.deleteItemAsync("identity");
          this.setState({ cert: null, sortedJson: null }, () =>
            this.props.navigation.push("DrivingLicense")
          );
        }
      );
    } else {
      this.props.navigation.push("DrivingLicense");
    }
  }

  renderKeyStore() {
    const { address, mnemonic } = this.state;
    return (
      <View>
        <Text style={styles.Text}>
          {mnemonic ? "Keystore was generated" : "No keystore"}
        </Text>
        <View style={styles.Buttons}>
          <ButtonPrimary
            label={mnemonic ? "See 12-word mnemonic passphrase" : "Generate"}
            onPress={
              mnemonic
                ? () => popupWithCopy(mnemonic, "Your mnemonic")
                : this.generateKeyStore
            }
          />
        </View>
        {address ? (
          <View>
            <Text style={styles.Text}>Your address on the blockchain:</Text>
            <Text style={styles.Code} selectable>
              {address}
            </Text>
          </View>
        ) : null}
      </View>
    );
  }

  renderPersonalData() {
    const { mnemonic, sortedJson } = this.state;
    return (
      <View>
        <Text style={styles.Text}>
          {sortedJson
            ? "Currently storing one identity"
            : "No personal data stored"}
        </Text>
        <View style={styles.Buttons}>
          <ButtonPrimary
            label={sortedJson ? "Edit personal data" : "Add personal data"}
            onPress={this.addOrEditData}
          />
        </View>
        {mnemonic || sortedJson ? (
          <View>
            <Text style={styles.Text}>
              This will clear both the keystore and your data:
            </Text>
            <View style={styles.Buttons}>
              <ButtonPrimary
                label="Delete all data"
                onPress={this.deleteEverything}
              />
            </View>
          </View>
        ) : null}
      </View>
    );
  }

  renderBlockchainStatus() {
    const { cert, mnemonic, sortedJson } = this.state;
    return (
      <View>
        <Text style={styles.Text}>
          {cert
            ? "Your identity is stored on the blockchain:"
            : "Store the identity on the blockchain:"}
        </Text>
        <View style={styles.Buttons}>
          <ButtonPrimary
            label={cert ? "View transaction" : "Send to CA"}
            onPress={cert ? this.viewCert : this.sendToCA}
            disabled={!mnemonic || !sortedJson}
          />
        </View>
      </View>
    );
  }

  render() {
    const { spinnerMsg } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Spinner
          visible={spinnerMsg !== null}
          textContent={spinnerMsg || ""}
          textStyle={{ ...styles.Text, color: colors.ulisse, fontSize: 22 }}
          color={colors.primary}
          overlayColor="rgba(0, 0, 0, 0.75)"
        />
        <ScrollView
          style={styles.Container}
          contentContainerStyle={styles.Container}
        >
          {this.renderKeyStore()}
          {this.renderPersonalData()}
          {this.renderBlockchainStatus()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: colors.ulisse,
    padding: 5
  },
  Buttons: {
    flex: 1,
    padding: 20
  },
  Text: {
    ...makeTextStyle("title", colors.secondary),
    textAlign: "center",
    padding: 6
  },
  Code: {
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    color: colors.uto,
    fontSize: 12,
    textAlign: "center",
    lineHeight: 20,
    margin: 3,
    marginBottom: 20
  },
  picker: {
    height: 100,
    width: 400,
    borderColor: "green"
  },
  textInput: {
    height: 40,
    maxHeight: 40,
    marginBottom: 10,
    flex: 1,
    borderColor: "green",
    borderWidth: 1,
    color: "green"
  },
  error: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green"
  }
});

export default MainScreen;
