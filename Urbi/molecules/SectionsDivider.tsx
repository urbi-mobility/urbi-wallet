import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "Urbi/utils/colors";
import { registeredTextStyle } from "Urbi/utils/textStyles";

const styles = StyleSheet.create({
  Wrapper: {
    backgroundColor: colors.ukko,
    height: 40
  },
  Label: {
    marginLeft: 16,
    marginRight: 7,
    marginBottom: 12,
    marginTop: 16
  }
});

const textStyle = registeredTextStyle("small", colors.uto, "SectionsDivider");
const labelStyle = [styles.Label, textStyle];

type SectionsDividersProps = {
  label: string;
  backgroundColor?: string;
};

export const SectionsDivider = (props: SectionsDividersProps) => {
  const { backgroundColor } = props;
  const wrapperStyle = backgroundColor
    ? [styles.Wrapper, { backgroundColor }]
    : styles.Wrapper;
  return (
    <View style={wrapperStyle}>
      <Text style={labelStyle}>{props.label.toUpperCase()}</Text>
    </View>
  );
};

export default SectionsDivider;
