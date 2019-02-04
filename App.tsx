import "node-libs-react-native/globals";
import "./globals";
import * as React from "react";
import { Component } from "react";
import MainScreen from "./screens/MainScreen";

export default class App extends Component {
  render() {
    return <MainScreen />;
  }
}
