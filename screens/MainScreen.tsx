import * as React from "react";
import {
  StyleSheet,
  Text,
  Platform,
  View,
  Picker,
  Button,
  TextInput
} from "react-native";
import Web3 from "web3";

const provider = Platform.select({
  ios: "ws://localhost:8545",
  android: "ws://10.0.2.2:8545"
});

const envs = [provider, "custom address"];

class MainScreen extends React.PureComponent<{}> {
  state = {
    accounts: [],
    latest: "",
    error: "",
    selectedNetwork: provider,
    endpoint: provider,
    web3: undefined
  };

  constructor(props: {}) {
    super(props);

    this.onItemPicked = this.onItemPicked.bind(this);
    this.onTextChanged = this.onTextChanged.bind(this);
    this.onConnectPressed = this.onConnectPressed.bind(this);
  }

  renderGanacheOutput() {
    return this.state.latest.length > 0 ? (
      <View style={{ flex: 1 }}>
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
    );
  }

  onItemPicked(itemValue: string) {
    this.setState({ selectedNetwork: itemValue });
  }

  onTextChanged(text: string) {
    this.setState({ endpoint: text });
  }

  onConnectPressed() {
    try {
      let { endpoint } = this.state;
      if (endpoint) {
        endpoint = endpoint.trim().toLowerCase();
        if (!endpoint.startsWith("ws")) {
          endpoint = `ws://${endpoint}`;
        }
        console.log(`connecting to ${endpoint}`);
        const web3 = new Web3(endpoint);
        this.setState({ web3, endpoint });

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
      } else {
        console.log("endpoint not set, not doing anything");
      }
    } catch (error) {
      console.log("error while connecting to web3: ", error);
      this.setState({ error: `error from web3.js: '${error}'` });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Super Crypto Wallet! 💣</Text>
        {this.state.web3 ? (
          this.renderGanacheOutput()
        ) : (
          <View style={{ flex: 1 }}>
            <Text style={styles.welcome}>Connect to:</Text>
            <Picker
              selectedValue={this.state.selectedNetwork}
              style={styles.picker}
              onValueChange={this.onItemPicked}
            >
              {envs.map(env => (
                <Picker.Item
                  key={`opt-${env}`}
                  label={env}
                  value={env}
                  color="green"
                />
              ))}
            </Picker>
            {this.state.selectedNetwork === "custom address" ? (
              <TextInput
                style={styles.textInput}
                onChangeText={this.onTextChanged}
                placeholder="A ws address to connect to"
                placeholderTextColor="rgba(0, 255, 0, 0.4)"
                value={this.state.endpoint}
              />
            ) : null}
            <Button
              onPress={this.onConnectPressed}
              title="Connect!"
              color="green"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
        )}
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
    padding: 5,
    paddingTop: 48
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
