import * as React from "react";
import "./globals";
import "node-libs-react-native/globals";
import { createAppContainer, createStackNavigator } from "react-navigation";
import { textStyle as makeTextStyle } from "Urbi/utils/textStyles";
import MainScreen from "./screens/MainScreen";
import ConnectScreen from "./screens/ConnectScreen";
import ConsentScreen from "./screens/ConsentScreen";
import { colors } from "Urbi/utils/colors";
import DrivingLicenseScreen from "./screens/DrivingLicense";

const navigator = createStackNavigator(
  {
    Home: MainScreen,
    Connect: ConnectScreen,
    Consent: {
      screen: ConsentScreen,
      path: "consent/:provider/:callback"
    },
    DrivingLicense: DrivingLicenseScreen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.primary
      },
      headerTintColor: colors.ulisse,
      headerTitleStyle: {
        ...makeTextStyle("title2", colors.ulisse)
      }
    }
  }
);

const Container = createAppContainer(navigator);

const prefix = "urbiwallet://";

export default class App extends React.Component<void> {
  render() {
    return <Container uriPrefix={prefix} />;
  }
}
