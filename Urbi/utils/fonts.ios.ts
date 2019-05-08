import { human, sanFranciscoWeights } from 'react-native-typography';
import { UrbiFontStyles } from './textStyles';

export const fontStyles: UrbiFontStyles = {
  hero: {
    ...human.largeTitleObject,
    ...sanFranciscoWeights.semibold,
  },
  title2: human.title1Object,
  title1: {
    ...human.title3Object,
    ...sanFranciscoWeights.semibold,
  },
  titleBold: {
    ...human.headlineObject,
    ...sanFranciscoWeights.semibold,
  },
  title: human.bodyObject,
  body: human.subheadObject,
  button: {
    ...human.subheadObject,
    ...sanFranciscoWeights.semibold,
  },
  small: {
    ...human.footnoteObject,
    ...sanFranciscoWeights.semibold,
  },
  micro: {
    ...human.caption2Object,
    ...sanFranciscoWeights.semibold,
    textTransform: 'uppercase',
  },
};
