import { StyleSheet, TextStyle } from 'react-native';
import { colors } from 'Urbi/utils/colors';
import { onIOS } from 'Urbi/utils/const';
import { fonts } from 'Urbi/utils/fonts';

export const fontStyles = {
  hero: {
    ...fonts.barlow,
    fontSize: 30,
    lineHeight: 32,
    letterSpacing: 0,
    textAlignVertical: 'center',
  },
  title2: {
    ...fonts.barlowMedium,
    fontSize: 25,
    lineHeight: 28,
    letterSpacing: 0,
    textAlignVertical: 'center',
  },
  title1: {
    ...fonts.barlowMedium,
    fontSize: 21,
    lineHeight: 24,
    letterSpacing: 0,
    textAlignVertical: 'center',
  },
  titleBold: {
    ...fonts.barlowMedium,
    fontSize: 17,
    lineHeight: 21,
    letterSpacing: 0,
    textAlignVertical: 'center',
  },
  title: {
    ...fonts.barlow,
    fontSize: 17,
    lineHeight: 21,
    letterSpacing: 0,
    textAlignVertical: 'center',
  },
  bodyBold: {
    ...fonts.barlowBold,
    fontSize: 15,
    lineHeight: 19,
    letterSpacing: 0,
    textAlignVertical: 'center',
  },
  body: {
    ...fonts.barlow,
    fontSize: 15,
    lineHeight: 19,
    letterSpacing: 0,
    textAlignVertical: 'center',
  },
  small: {
    ...fonts.barlowBold,
    fontSize: 13,
    lineHeight: 15,
    letterSpacing: 0.3,
    textAlignVertical: 'center',
  },
  micro: {
    ...fonts.barlowExtraBold,
    fontSize: 9,
    lineHeight: 12,
    letterSpacing: 1,
    textAlignVertical: 'center',
  },
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
