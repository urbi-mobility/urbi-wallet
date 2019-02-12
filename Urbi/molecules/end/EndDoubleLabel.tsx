import * as React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors } from 'Urbi/utils/colors';
import { registeredTextStyle } from 'Urbi/utils/textStyles';

type EndDoubleLabelProps = {
  label: string;
  subtitle: string;
  style?: ViewStyle;
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

const labelStyle = registeredTextStyle('titleBold', colors.uma, 'EndDoubleLabel');
const subtitleStyle = registeredTextStyle('body', colors.uto, 'EndDoubleLabelSubtitle');

export const EndDoubleLabel = (props: EndDoubleLabelProps) => (
  <View style={[styles.Wrapper, props.style]}>
    <Text style={[labelStyle, styles.Text]} numberOfLines={1}>
      {props.label}
    </Text>
    <Text style={[subtitleStyle, styles.Text]} numberOfLines={1}>
      {props.subtitle}
    </Text>
  </View>
);

export default EndDoubleLabel;
