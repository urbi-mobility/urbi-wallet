import * as React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors } from 'Urbi/utils/colors';
import { registeredTextStyle } from 'Urbi/utils/textStyles';

type LabelProps = {
  text: string;
  style?: ViewStyle;
};

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    minHeight: 40,
    justifyContent: 'center',
  },
});

const textStyle = registeredTextStyle('title', colors.uma);

export const LabelTitle = (props: LabelProps) => (
  <View style={[styles.Wrapper, props.style]}>
    <Text style={textStyle} numberOfLines={1}>
      {props.text}
    </Text>
  </View>
);

export default LabelTitle;
