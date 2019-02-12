import * as React from "react";
import { NavigationScreenProps } from "react-navigation";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Linking } from "expo";
import { serializeToJson } from "urbi-wallet/util/jsonUtils";
import DoubleChoice from "Urbi/components/DoubleChoice";
import ButtonCompactDefault from "Urbi/molecules/buttons/ButtonCompactDefault";
import ButtonCompactPrimary from "Urbi/molecules/buttons/ButtonCompactPrimary";
import { textStyle as makeTextStyle } from "Urbi/utils/textStyles";
import { colors } from "Urbi/utils/colors";

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
    this.onNoPressed = this.onNoPressed.bind(this);

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

  onNoPressed() {
    console.log("nope");
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
        <DoubleChoice
          left={
            <ButtonCompactDefault label="Nope" onPress={this.onNoPressed} />
          }
          right={
            <ButtonCompactPrimary label="Yep" onPress={this.onOkPressed} />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Row: {
    backgroundColor: "white",
    alignItems: "center",
    marginBottom: 16
  },
  Component: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1
  },
  Text: {
    ...makeTextStyle("body", colors.secondary),
    textAlign: "center",
    padding: 6
  },
  Code: {
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    textAlign: "center"
  },
  Label: { backgroundColor: "#eee", flex: 1, alignSelf: "stretch" }
});

export default ConsentScreen;
