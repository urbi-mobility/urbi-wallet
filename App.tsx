import * as React from "react";
import "node-libs-react-native/globals";
import "./globals";
import { Platform } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";
import MainScreen from "./screens/MainScreen";
import ConnectScreen from "./screens/ConnectScreen";
import ConsentScreen from "./screens/ConsentScreen";
import { Linking, Font } from "expo";
import { colors } from "Urbi/utils/colors";

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

export default class App extends React.Component<{}, { fontsLoaded: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { fontsLoaded: false };
  }
  async componentDidMount() {
    await Font.loadAsync({
      Barlow: require("./assets/fonts/Barlow-Regular.ttf"),
      "Barlow-Medium": require("./assets/fonts/Barlow-Medium.ttf"),
      "Barlow-Bold": require("./assets/fonts/Barlow-Bold.ttf"),
      "Barlow-ExtraBold": require("./assets/fonts/Barlow-ExtraBold.ttf")
    });
    this.setState({ fontsLoaded: true });
  }
  render() {
    if (!this.state.fontsLoaded) return null;
    return <Container uriPrefix={prefix} />;
  }
}
