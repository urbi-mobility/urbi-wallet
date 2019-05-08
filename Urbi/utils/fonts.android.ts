import { material, robotoWeights } from 'react-native-typography';
import { UrbiFontStyles } from './textStyles';

export const fontStyles: UrbiFontStyles = {
  hero: {
    ...material.display1Object,
    ...robotoWeights.medium,
  },
  title2: material.headlineObject,
  title1: material.titleObject,
  titleBold: {
    ...material.subheadingObject,
    ...robotoWeights.medium,
  },
  title: {
    ...material.subheadingObject,
    lineHeight: 22,
  },
  body: material.body1Object,
  button: material.buttonObject,
  small: {
    ...material.captionObject,
    ...robotoWeights.medium,
  },
  micro: {
    ...material.buttonObject,
    fontSize: 10,
    lineHeight: 12,
  },
};
