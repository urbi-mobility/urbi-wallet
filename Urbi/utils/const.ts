import { Dimensions, Platform } from "react-native";

export const onIOS = Platform.OS === "ios";

export const windowHeight = Dimensions.get("window").height;

// TODO replace this horrible hack with something better on the iPhone X
export const onIphoneX = onIOS && windowHeight > 800;

export const hasAndroidTranslucentStatusBar = !onIOS && Platform.Version >= 20;

export const statusBarOffset = onIOS
  ? onIphoneX
    ? 32
    : 20
  : hasAndroidTranslucentStatusBar
  ? 24
  : 0;

export const tabBarHeight = onIOS ? 48 + (windowHeight > 800 ? 34 : 0) : 56;
