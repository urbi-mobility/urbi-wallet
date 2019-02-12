import * as React from "react";
import { Platform, StyleSheet, Text, ScrollView } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import * as lightwallet from "eth-lightwallet";
import testIdentity from "urbi-wallet/assets/testIdentity.json";
import { serialize } from "urbi-wallet/util/jsonUtils";
import { signMsg, createKeystore } from "urbi-wallet/util/cryptoUtils";
import { SecureStore } from "expo";
import { colors } from "Urbi/utils/colors";
import { textStyle as makeTextStyle } from "Urbi/utils/textStyles";

class MainScreen extends React.Component<NavigationScreenProps> {
  static navigationOptions = {
    title: "Super Crypto Wallet! 💣"
  };

  state = {
    address: "",
    mnemonic: "",
    signedJson: "",
    sortedJson: JSON.stringify(serialize(testIdentity))
  };

  componentDidMount() {
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
          const { address, lightwalletKeystore, pwDerivedKey } = keystore;
          const signedJson = signMsg(
            lightwalletKeystore,
            pwDerivedKey,
            this.state.sortedJson,
            address
          );

          this.setState({ address, signedJson });
        })
        .catch(err => {
          throw err;
        });
    });
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.Text}>here's the sorted json:</Text>
        <Text style={styles.Code}>{this.state.sortedJson}</Text>
        <Text style={styles.Text}>
          Here's a random 12-word mnemonic, because why not?
        </Text>
        <Text style={styles.Code}>{this.state.mnemonic}</Text>
        <Text style={styles.Text}>
          ...which was used to generate this address:
        </Text>
        <Text style={styles.Code}>{this.state.address}</Text>
        <Text style={styles.Text}>
          ...which was used to sign the json above into:
        </Text>
        <Text style={styles.Code}>{this.state.signedJson}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.ulisse,
    padding: 5
  },
  Text: {
    ...makeTextStyle("body", colors.secondary),
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
