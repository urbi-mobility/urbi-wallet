import * as React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors } from 'Urbi/utils/colors';
import { registeredTextStyle } from 'Urbi/utils/textStyles';

type LabelProps = {
  label: string;
  subtitle: string;
  style?: ViewStyle;
};

const styles = StyleSheet.create({
  Wrapper: {
    minHeight: 40,
    justifyContent: 'center',
    flex: 1,
  },
});

const titleStyle = registeredTextStyle('title', colors.uma, 'DoubleLabel');
const subtitleStyle = registeredTextStyle('body', colors.uto, 'DoubleLabelSubtitle');

export const DoubleLabel = (props: LabelProps) => (
  <View style={[styles.Wrapper, props.style]}>
    <Text style={titleStyle} numberOfLines={2}>
      {props.label}
    </Text>
    <Text style={subtitleStyle} numberOfLines={2}>
      {props.subtitle}
    </Text>
  </View>
);

export default DoubleLabel;
