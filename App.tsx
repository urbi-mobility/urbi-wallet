import * as React from "react";
import "node-libs-react-native/globals";
import "./globals";
import { Platform } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";
import MainScreen from "./screens/MainScreen";
import ConnectScreen from "./screens/ConnectScreen";

const navigator = createStackNavigator(
  {
    Home: MainScreen,
    Connect: ConnectScreen
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

export default class App extends React.Component {
  render() {
    return <Container />;
  }
}
