import * as React from "react";
import { Component } from "react";
import { StyleSheet, Text, Platform, View } from "react-native";
import Web3 from "web3";

const provider = Platform.select({
  ios: "ws://localhost:8545",
  android: "ws://10.0.2.2:8545"
});

class Test extends React.PureComponent<{}> {
  web3?: Web3;
  state = { accounts: [], latest: "" };

  constructor(props: {}) {
    super(props);
    try {
      this.web3 = new Web3(provider);
    } catch (error) {
      this.web3 = undefined;
      console.log("error while connecting to web3");
    }
  }

  componentWillMount() {
    if (this.web3) {
      this.web3.eth
        .getBlock("latest")
        .then(latest => this.setState({ latest: latest.hash }))
        .catch(console.log);

      this.web3.eth.getAccounts((error, res) => {
        if (!error) {
          this.setState({ accounts: res });
        } else {
          this.setState({ accounts: [error] });
        }
      });
    } else {
      console.log("no web3 for you!");
    }
  }

  renderGanacheOutput() {
    return this.state.latest.length > 0 ? (
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
        Trying to connect to ganache-cli on {provider}, if you see a red error,
        maybe you haven't run ganache-cli?
      </Text>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Super Crypto Wallet! 💣</Text>
        {this.renderGanacheOutput()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  }
});

export default Test;
