import * as React from "react";
import { Platform, StyleSheet, Text, ScrollView } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import * as lightwallet from "eth-lightwallet";
import testIdentity from "../assets/testIdentity.json";
import { mnemonicToSeedHex } from "../crypto/bip39";
import { serialize } from "../util/jsonUtils";

class MainScreen extends React.Component<NavigationScreenProps> {
  static navigationOptions = {
    title: "Super Crypto Wallet! 💣"
  };

  state = {
    addresses: [],
    mnemonic: "",
    signedJson: "",
    sortedJson: JSON.stringify(serialize(testIdentity))
  };

  componentDidMount() {
    const mnemonic = lightwallet.keystore.generateRandomSeed();
    const password = "omfg it's a secret";
    lightwallet.keystore.createVault(
      {
        hdPathString: "m/44'/60'/0'/0",
        seedPhrase: mnemonic,
        password
      },
      (err, ks) => {
        if (err) throw err;

        ks.keyFromPassword(password, (err2, pwDerivedKey) => {
          if (err2) throw err2;

          ks.generateNewAddress(pwDerivedKey, 1);
          const addresses = ks.getAddresses();
          const signature = lightwallet.signing.signMsg(
            ks,
            pwDerivedKey,
            this.state.sortedJson,
            addresses[0]
          );
          const signedJson = lightwallet.signing.concatSig(signature);
          this.setState({ addresses, signedJson });
        });
      }
    );
    this.setState({ mnemonic });
  }

  render() {
    return (
      <ScrollView
        style={{ backgroundColor: "#000" }}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.welcome}>here's the sorted json:</Text>
        <Text style={styles.instructions}>{this.state.sortedJson}</Text>
        <Text style={styles.welcome}>
          Here's a random 12-word mnemonic, because why not?
        </Text>
        <Text style={styles.instructions}>{this.state.mnemonic}</Text>
        <Text style={styles.welcome}>
          ...which was used to generate this address:
        </Text>
        <Text style={styles.instructions}>{this.state.addresses}</Text>
        <Text style={styles.welcome}>
          ...which was used to sign the json above into:
        </Text>
        <Text style={styles.instructions}>{this.state.signedJson}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    padding: 5
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "green"
  },
  instructions: {
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    textAlign: "center",
    lineHeight: 20,
    color: "green",
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
