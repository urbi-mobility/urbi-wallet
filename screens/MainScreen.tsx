import * as React from "react";
import { Platform, StyleSheet, Text, View, ScrollView } from "react-native";
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
    mnemonic: "",
    seed: ""
  };

  componentDidMount() {
    const mnemonic = lightwallet.keystore.generateRandomSeed();
    const seed = mnemonicToSeedHex(mnemonic, "omfg it's a secret");
    this.setState({ mnemonic, seed });
  }

  render() {
    return (
      <ScrollView
        style={{ backgroundColor: "#000" }}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.welcome}>
          Here's a random 12-word mnemonic, because why not?
        </Text>
        <Text style={styles.instructions}>{this.state.mnemonic}</Text>
        <Text style={styles.welcome}>
          ...which as an encrypted (with a super-strong password, too!) seed is
        </Text>
        <Text style={styles.instructions}>{this.state.seed}</Text>
        <Text style={styles.welcome}>here's the sorted json:</Text>
        <Text style={styles.instructions}>
          {JSON.stringify(serialize(testIdentity))}
        </Text>
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
