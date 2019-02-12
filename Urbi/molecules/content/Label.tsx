import * as React from 'react';
import { RegisteredStyle, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors } from 'Urbi/utils/colors';
import { registeredTextStyle } from 'Urbi/utils/textStyles';

type LabelProps = {
  text: string;
  style?: ViewStyle | RegisteredStyle<ViewStyle>;
  textColor?: string;
};

const styles = StyleSheet.create({
  Wrapper: {
    minHeight: 40,
    justifyContent: 'center',
  },
});

const textStyle = registeredTextStyle('title', colors.uma, 'Label');

export const Label = (props: LabelProps) => (
  <View style={[styles.Wrapper, props.style]}>
    <Text style={[textStyle, { color: props.textColor || colors.uma }]} numberOfLines={1}>
      {props.text}
    </Text>
  </View>
);

export default Label;
