import * as React from 'react';
import { Image, ImageRequireSource, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors } from 'Urbi/utils/colors';
import { registeredTextStyle } from 'Urbi/utils/textStyles';

type EndLabelAndIconProps = {
  label: string;
  icon: ImageRequireSource;
  style?: ViewStyle;
};

const styles = StyleSheet.create({
  Wrapper: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    flex: 2, // the other component must have 3
  },
  TextView: {
    marginRight: 8,
    flexShrink: 1,
  },
  Text: {
    textAlign: 'right',
  },
  Icon: {
    minWidth: 20,
    minHeight: 20,
  },
});

const textStyle = registeredTextStyle('titleBold', colors.uma, 'EndLabelAndIcon');

export const EndLabelAndIcon = (props: EndLabelAndIconProps) => (
  <View style={[styles.Wrapper, props.style]}>
    <View style={styles.TextView}>
      <Text style={[textStyle, styles.Text]} numberOfLines={1}>
        {props.label}
      </Text>
    </View>
    <View style={styles.Icon}>
      <Image style={{ width: 20, height: 20 }} source={props.icon} />
    </View>
  </View>
);

export default EndLabelAndIcon;
