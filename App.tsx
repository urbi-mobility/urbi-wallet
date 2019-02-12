import * as React from "react";
import "node-libs-react-native/globals";
import "./globals";
import { Platform } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";
import MainScreen from "./screens/MainScreen";
import ConnectScreen from "./screens/ConnectScreen";
import ConsentScreen from "./screens/ConsentScreen";
import { Linking } from "expo";

const navigator = createStackNavigator(
  {
    Home: MainScreen,
    Connect: ConnectScreen,
    Consent: {
      screen: ConsentScreen,
      path: "consent/:provider/:callback"
    }
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#222222"
      },
      headerTintColor: "green",
      headerTitleStyle: {
        fontWeight: "normal",
        fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
        fontSize: 16
      }
    }
  }
);

const Container = createAppContainer(navigator);

const prefix = Linking.makeUrl("/");

export default class App extends React.Component {
  render() {
    return <Container uriPrefix={prefix} />;
  }
}
