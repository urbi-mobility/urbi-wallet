import * as React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "Urbi/utils/colors";

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: colors.ukko,
    height: 1,
    marginLeft: 12,
    marginRight: 12
  }
});

type ItemSeparatorProps = {
  backgroundColor?: string;
};

const ItemSeparator = (props: ItemSeparatorProps) => {
  const { backgroundColor } = props;
  return backgroundColor ? (
    <View style={[styles.Wrapper, { backgroundColor }]} />
  ) : (
    <View style={styles.Wrapper} />
  );
};

export default ItemSeparator;
