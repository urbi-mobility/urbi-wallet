import * as React from "react";
import "node-libs-react-native/globals";
import "./globals";
import { Platform } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";
import MainScreen from "./screens/MainScreen";
import ConnectScreen from "./screens/ConnectScreen";
import ConsentScreen from "./screens/ConsentScreen";
import { Linking, Font, AppLoading } from "expo";
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
        fontWeight: "normal",
        fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
        fontSize: 16
      }
    }
  }
);

const Container = createAppContainer(navigator);

const prefix = Linking.makeUrl("/");

export default class App extends React.Component<
  {},
  { fontsLoaded: boolean; shownSplash: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { fontsLoaded: false, shownSplash: false };
    setTimeout(() => this.setState({ shownSplash: true }), 1500);
  }

  async componentDidMount() {
    await Font.loadAsync({
      Barlow: require("./assets/fonts/Barlow-Regular.ttf"),
      "Barlow-Regular": require("./assets/fonts/Barlow-Regular.ttf"),
      "Barlow-Medium": require("./assets/fonts/Barlow-Medium.ttf"),
      "Barlow-Bold": require("./assets/fonts/Barlow-Bold.ttf"),
      "Barlow-ExtraBold": require("./assets/fonts/Barlow-ExtraBold.ttf")
    });
    this.setState({ fontsLoaded: true });
  }

  render() {
    if (!this.state.fontsLoaded || !this.state.shownSplash)
      return <AppLoading onError={console.warn} />;
    return <Container uriPrefix={prefix} />;
  }
}
