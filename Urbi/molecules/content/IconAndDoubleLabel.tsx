import * as React from 'react';
import { Image, ImageRequireSource, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors } from 'Urbi/utils/colors';
import { registeredTextStyle } from 'Urbi/utils/textStyles';

type LabelProps = {
  label: string;
  subtitle: string;
  icon: ImageRequireSource;
  style?: ViewStyle;
};

const styles = StyleSheet.create({
  Wrapper: {
    flexDirection: 'row',
    flex: 1,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageWrapper: {
    minWidth: 40,
    marginRight: 8,
  },
});

const titleStyle = registeredTextStyle('title', colors.uma, 'IconAndDoubleLabel');
const subtitleStyle = registeredTextStyle('body', colors.uto, 'IconAndDoubleLabelSubtitle');

export const IconAndDoubleLabel = (props: LabelProps) => (
  <View style={[styles.Wrapper, props.style]}>
    <View style={styles.ImageWrapper}>
      <Image style={{ width: 40, height: 40 }} source={props.icon} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={titleStyle} numberOfLines={2}>
        {props.label}
      </Text>
      <Text style={subtitleStyle}>{props.subtitle}</Text>
    </View>
  </View>
);

export default IconAndDoubleLabel;
