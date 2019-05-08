import { StyleSheet, TextStyle } from 'react-native';
import { colors } from 'Urbi/utils/colors';
import { onIOS } from 'Urbi/utils/const';
import { fontStyles } from 'Urbi/utils/fonts';

export type UrbiFontStyles = {
  hero: TextStyle;
  title2: TextStyle;
  title1: TextStyle;
  titleBold: TextStyle;
  title: TextStyle;
  body: TextStyle;
  button: TextStyle;
  small: TextStyle;
  micro: TextStyle;
};

export const textStyle = (style: keyof typeof fontStyles, color: string = colors.uma) =>
  ({ ...fontStyles[style], color } as TextStyle);

export const registeredTextStyle = (
  style: keyof typeof fontStyles,
  color: string = colors.uma,
  name: string = style
) => StyleSheet.create({ [name]: textStyle(style, color) })[name];

export const defaultBody = registeredTextStyle('body');
export const backHeader = onIOS
  ? registeredTextStyle('title', colors.uma, 'back-header')
  : registeredTextStyle('title1', colors.uma, 'back-header');
