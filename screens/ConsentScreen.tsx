import * as React from "react";
import { NavigationScreenProps } from "react-navigation";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Linking, SecureStore } from "expo";
import { textStyle as makeTextStyle } from "Urbi/utils/textStyles";
import { colors } from "Urbi/utils/colors";
import ButtonPrimary from "Urbi/molecules/buttons/ButtonPrimary";
import { popup } from "urbi-wallet/util/uiUtils";

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
    SecureStore.getItemAsync("cert").then(storedCert => {
      if (!storedCert) {
        popup("You know nothing, Jon Snow");
      } else {
        const url = `${
          this.state.callback
        }?consent=true&payload=${encodeURIComponent(storedCert)}`;
        console.log(url);
        Linking.openURL(url);
      }
    });
  }

  render() {
    return (
      <View style={styles.Row}>
        <Text style={styles.Text}>
          {this.state.provider} wants to steal all your 💰. Is it ok?
        </Text>
        <Text style={styles.Text}>
          I will call <Text style={styles.Code}>{this.state.callback}</Text> to
          notify of the outcome
        </Text>
        <View style={styles.ButtonContainer}>
          <ButtonPrimary label="Allow access" onPress={this.onOkPressed} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Row: {
    flex: 1,
    backgroundColor: colors.ulisse
  },
  ButtonContainer: {
    flex: 1,
    padding: 10
  },
  Text: {
    ...makeTextStyle("body", colors.secondary),
    textAlign: "center",
    padding: 6
  },
  Code: {
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    textAlign: "center"
  }
});

export default ConsentScreen;
