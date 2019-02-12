import * as React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors } from 'Urbi/utils/colors';
import { registeredTextStyle } from 'Urbi/utils/textStyles';

type EndLabelProps = {
  label: string;
  style?: ViewStyle;
  textColor?: string;
};

const styles = StyleSheet.create({
  Wrapper: {
    height: 40,
    justifyContent: 'center',
    flex: 2, // the other component must have 3
    flexShrink: 1,
  },
  Text: {
    textAlign: 'right',
  },
});

const textStyle = registeredTextStyle('titleBold', colors.uma, 'EndLabel');

export const EndLabel = (props: EndLabelProps) => (
  <View style={[styles.Wrapper, props.style]}>
    <Text
      style={[textStyle, styles.Text, { color: props.textColor || colors.uma }]}
      numberOfLines={1}
    >
      {props.label}
    </Text>
  </View>
);

export default EndLabel;
