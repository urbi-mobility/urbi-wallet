import * as React from "react";
import { Platform, StyleSheet, Text, ScrollView, View } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import * as lightwallet from "eth-lightwallet";
import * as testIdentity from "urbi-wallet/assets/testIdentity.json";
import {
  signMsg,
  createKeystore,
  UrbiKeyStore
} from "urbi-wallet/util/cryptoUtils";
import { SecureStore } from "expo";
import { colors } from "Urbi/utils/colors";
import { textStyle as makeTextStyle } from "Urbi/utils/textStyles";
import ButtonPrimary from "Urbi/molecules/buttons/ButtonPrimary";
import { serializeToJson } from "urbi-wallet/util/jsonUtils";

const caBaseUrl = "https://urbitunnel.eu.ngrok.io";

class MainScreen extends React.Component<NavigationScreenProps> {
  static navigationOptions = {
    title: "Super Crypto Wallet! 💣"
  };

  state: {
    address: string;
    mnemonic: string;
    signedJson: string;
    sortedJson: string;
    keystore?: UrbiKeyStore;
  } = {
    address: "loading...",
    mnemonic: "loading...",
    signedJson: "loading...",
    sortedJson: "loading..."
  };

  constructor(props: NavigationScreenProps) {
    super(props);

    this.sendToCA = this.sendToCA.bind(this);
    this.withNonce = this.withNonce.bind(this);
  }

  componentDidMount() {
    SecureStore.getItemAsync("data").then(storedData => {
      const sortedJson =
        storedData || this.withNonce(serializeToJson(testIdentity));
      this.setState({ sortedJson });

      SecureStore.getItemAsync("mnemonic").then(stored => {
        let mnemonic, password;
        if (!stored) {
          mnemonic = lightwallet.keystore.generateRandomSeed();
          password = "omfg it's a secret";
          SecureStore.setItemAsync("mnemonic", `${mnemonic}:${password}`);
        } else {
          const split = stored.split(":");
          mnemonic = split[0];
          password = split.splice(1).join(":");
        }

        this.setState({ mnemonic });

        createKeystore(mnemonic, password)
          .then(keystore => {
            this.setState(
              { address: keystore.address, keystore },
              this.signJson
            );

            // reload data from SecureStorage every time the page is displayed anew
            this.props.navigation.addListener("willFocus", () => {
              SecureStore.getItemAsync("data").then(storedData => {
                this.setState(
                  {
                    sortedJson: this.withNonce(storedData!)
                  },
                  this.signJson
                );
              });
            });
          })
          .catch(err => {
            throw err;
          });
      });
    });
  }

  withNonce(storedData: string) {
    const j = JSON.parse(storedData);
    return serializeToJson({
      ...j,
      nonce: Math.ceil(Math.random() * 1e18).toString()
    });
  }

  signJson() {
    const { address, lightwalletKeystore, pwDerivedKey } = this.state.keystore!;
    const signedJson = signMsg(
      lightwalletKeystore,
      pwDerivedKey,
      this.state.sortedJson,
      address
    );
    this.setState({ signedJson });
  }

  async sendToCA() {
    try {
      const tx = serializeToJson({
        address: this.state.address,
        signature: this.state.signedJson,
        payload: JSON.parse(this.state.sortedJson)
      });
      const response = await fetch(`${caBaseUrl}/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: tx
      });

      if (response.status === 200) {
        SecureStore.setItemAsync("cert", tx).catch(e =>
          window.alert(`Couldn't store validated transaction. ${e}`)
        );

        SecureStore.setItemAsync("data", this.state.sortedJson).catch(e =>
          window.alert(`oh no. Oh no no no. Couldn't store signed data. ${e}`)
        );
      }

      window.alert(`The CA says:\n${JSON.stringify(await response.json())}`);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <ScrollView
        style={styles.Container}
        contentContainerStyle={styles.Container}
      >
        <Text style={styles.Text}>here's the sorted json:</Text>
        <Text style={styles.Code}>{this.state.sortedJson}</Text>
        <Text style={styles.Text}>here's the 12-word mnemonic seed:</Text>
        <Text style={styles.Code}>{this.state.mnemonic}</Text>
        <Text style={styles.Text}>
          ...which was used to generate this address:
        </Text>
        <Text style={styles.Code}>{this.state.address}</Text>
        <Text style={styles.Text}>
          ...which was used to sign the json above into:
        </Text>
        <Text style={styles.Code}>{this.state.signedJson}</Text>
        <View style={styles.BottomButton}>
          <ButtonPrimary
            label="Add/Edit personal data"
            onPress={() => navigation.push("DrivingLicense")}
          />
        </View>
        <View style={styles.BottomButton}>
          <ButtonPrimary label="Send to CA" onPress={this.sendToCA} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: colors.ulisse,
    padding: 5
  },
  BottomButton: {
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
    margin: 3
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
