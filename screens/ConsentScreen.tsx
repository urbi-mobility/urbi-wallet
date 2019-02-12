import * as React from "react";
import { NavigationScreenProps } from "react-navigation";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Linking } from "expo";
import { serializeToJson } from "urbi-wallet/util/jsonUtils";
import ButtonPrimary from "Urbi/molecules/buttons/ButtonPrimary";

class ConsentScreen extends React.Component<NavigationScreenProps> {
  static navigationOptions = {
    title: "Attenzi1! 🧐"
  };

  state = {
    provider: "Some unknown provider",
    callback: "No callback"
  };

  constructor(props: NavigationScreenProps) {
    super(props);

    this.onOkPressed = this.onOkPressed.bind(this);

    const { navigation } = props;
    this.state = {
      provider: navigation.getParam("provider", this.state.provider),
      callback: decodeURIComponent(
        navigation.getParam("callback", this.state.callback)
      )
    };
  }

  onOkPressed() {
    const url = Linking.makeUrl(this.state.callback, {
      consent: true,
      payload: serializeToJson({ bananas: 23 })
    });
    console.log(url);
    Linking.openURL(url);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.state.provider} wants to steal all your 💰. Is it ok?
        </Text>
        <Text style={styles.welcome}>
          I will call{" "}
          <Text style={styles.instructions}>{this.state.callback}</Text> to
          notify of the outcome
        </Text>
        <ButtonPrimary onPress={this.onOkPressed} label="Ok" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default ConsentScreen;
