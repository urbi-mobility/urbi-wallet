import * as React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import Web3 from "web3";
import { defaultEndpoint } from "./MainScreen";
import { generateMnemonic, mnemonicToSeedHex } from "../crypto/bip39";

export default class AccountsScreen extends React.Component<
  NavigationScreenProps
> {
  static navigationOptions = ({ navigation }: NavigationScreenProps) => ({
    title: `SCW at ${navigation.getParam("endpoint", defaultEndpoint)}`
  });

  state = {
    accounts: [],
    latest: "",
    mnemonic: "",
    error: "",
    endpoint: defaultEndpoint,
    seed: "",
    web3: undefined
  };

  componentDidMount() {
    const endpoint = this.props.navigation.getParam(
      "endpoint",
      defaultEndpoint
    );
    const mnemonic = generateMnemonic(128);
    const seed = mnemonicToSeedHex(mnemonic, "omfg it's a secret");

    this.setState({ endpoint, mnemonic, seed }, () => {
      try {
        const web3 = new Web3(endpoint);
        this.setState({ web3 });

        web3.eth
          .getBlock("latest")
          .then(latest => this.setState({ latest: latest.hash }))
          .catch(console.log);

        web3.eth.getAccounts((error, res) => {
          if (!error) {
            this.setState({ accounts: res });
          } else {
            this.setState({ accounts: [error] });
          }
        });
      } catch (error) {
        console.log("error while connecting to web3: ", error);
        this.setState({ error: `error from web3.js: '${error}'` });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.latest.length > 0 ? (
          <View>
            <Text style={styles.welcome}>Latest block is:</Text>
            <Text style={styles.instructions}>{this.state.latest}</Text>
            <Text style={styles.welcome}>Your accounts on ganache-cli:</Text>
            <Text style={styles.instructions}>
              {this.state.accounts.map(a => `${a}\n`)}
            </Text>
            <Text style={styles.welcome}>🤔</Text>
          </View>
        ) : (
          <Text style={styles.welcome}>
            Trying to connect to eth on {this.state.endpoint}, if you can read
            this... maybe you haven't run ganache-cli?
          </Text>
        )}
        <Text style={styles.welcome}>
          Here's a random 12-word mnemonic, because why not?
        </Text>
        <Text style={styles.instructions}>{this.state.mnemonic}</Text>
        <Text style={styles.welcome}>
          ...which as an encrypted (with a super-strong password, too!) seed is
        </Text>
        <Text style={styles.instructions}>{this.state.seed}</Text>
        {this.state.error ? (
          <Text style={styles.error}>{this.state.error}</Text>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
