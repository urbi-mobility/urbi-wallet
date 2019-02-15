import * as React from "react";
import { Platform, StyleSheet, Switch, View, ViewStyle } from "react-native";
import { colors } from "Urbi/utils/colors";

export interface ListItem {
  content: JSX.Element;
  onSwitchToggle: (value: boolean) => any;
  secondaryAction?: JSX.Element;
  enabled: boolean;
}

const styles = StyleSheet.create({
  Row: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 56,
    paddingTop: 8,
    paddingRight: 12,
    paddingBottom: 8,
    paddingLeft: 16
  } as ViewStyle,
  Content: {
    flex: 1,
    marginRight: 8
  } as ViewStyle
});

const getSwitch = (item: ListItem) =>
  Platform.select({
    ios: (
      <Switch
        trackColor={{ true: colors.uma, false: colors.ukko }}
        value={item.enabled}
        onValueChange={item.onSwitchToggle}
      />
    ),
    android: (
      <Switch
        trackColor={{ true: colors.ughina, false: colors.ursula }}
        // the property does exist, type definitions haven't been updated (if you use the old prop you get a warning)
        thumbColor={item.enabled ? colors.uma : colors.ukko}
        value={item.enabled}
        onValueChange={item.onSwitchToggle}
      />
    )
  });

const withRightMargin = (item?: JSX.Element) => {
  if (!item) return null;
  return React.cloneElement(item, { style: { marginRight: 8 } });
};

export const ListItemSwitch = (item: ListItem) => (
  <View style={styles.Row}>
    {React.cloneElement(item.content, { style: styles.Content })}
    {withRightMargin(item.secondaryAction)}
    {getSwitch(item)}
  </View>
);

export default ListItemSwitch;
