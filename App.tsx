import "node-libs-react-native/globals";
import "./globals";
import * as React from "react";
import { Component } from "react";
import Test from "./Test";

const ErrorUtils = require("ErrorUtils");
ErrorUtils.setGlobalHandler(error => {});

export default class App extends Component {
  render() {
    return <Test />;
  }
}
