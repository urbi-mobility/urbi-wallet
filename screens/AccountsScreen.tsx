import * as React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import Web3 from "web3";
import { defaultEndpoint } from "./MainScreen";

export default class AccountsScreen extends React.Component<
  NavigationScreenProps
> {
  static navigationOptions = ({ navigation }: NavigationScreenProps) => ({
    title: `SCW at ${navigation.getParam("endpoint", defaultEndpoint)}`
  });

  state = {
    accounts: [],
    latest: "",
    error: "",
    endpoint: defaultEndpoint,
    web3: undefined
  };

  componentDidMount() {
    const endpoint = this.props.navigation.getParam(
      "endpoint",
      defaultEndpoint
    );
    console.log(`connecting to ${endpoint}`);

    this.setState({ endpoint }, () => {
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
