import * as React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { colors } from "Urbi/utils/colors";

const styles = StyleSheet.create({
  Wrapper: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center"
  } as ViewStyle,
  Handle: {
    backgroundColor: colors.ursula,
    borderRadius: 2,
    width: 34,
    height: 4,
    marginTop: 8
  } as ViewStyle
});

export const PanelHandle = () => (
  <View style={styles.Wrapper}>
    <View style={styles.Handle} />
  </View>
);
