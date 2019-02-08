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
import { NavigationScreenProps } from "react-navigation";

export const defaultEndpoint = Platform.select({
  ios: "ws://localhost:8545",
  android: "ws://10.0.2.2:8545"
});

const envs = [defaultEndpoint, "custom address"];

class ConnectScreen extends React.Component<NavigationScreenProps> {
  static navigationOptions = {
    title: "Super Crypto Wallet! 💣"
  };

  state = {
    selectedNetwork: defaultEndpoint,
    endpoint: defaultEndpoint
  };

  constructor(props: NavigationScreenProps) {
    super(props);

    this.onItemPicked = this.onItemPicked.bind(this);
    this.onTextChanged = this.onTextChanged.bind(this);
    this.onConnectPressed = this.onConnectPressed.bind(this);
  }

  onItemPicked(itemValue: string) {
    this.setState({ selectedNetwork: itemValue });
  }

  onTextChanged(text: string) {
    this.setState({ endpoint: text });
  }

  onConnectPressed() {
    let { endpoint } = this.state;
    if (endpoint) {
      endpoint = endpoint.trim().toLowerCase();
      if (!endpoint.startsWith("ws")) {
        endpoint = `ws://${endpoint}`;
      }
      this.setState({ endpoint });
      this.props.navigation.navigate("Accounts", { endpoint });
    }
  }

  render() {
    return (
      <View style={styles.container}>
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
            accessibilityLabel="Connect to the eth web socket"
          />
        </View>
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
  picker: {
    height: 100,
    width: 400,
    justifyContent: "space-around",
    borderColor: "green",
    marginBottom: 20
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

export default ConnectScreen;
