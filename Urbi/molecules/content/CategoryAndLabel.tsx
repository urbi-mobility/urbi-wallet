import * as React from 'react';
import { RegisteredStyle, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors } from 'Urbi/utils/colors';
import { registeredTextStyle } from 'Urbi/utils/textStyles';

type CategoryAndLabelProps = {
  category: string;
  label: string;
  style?: ViewStyle | RegisteredStyle<ViewStyle>;
};

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
  },
  Category: {
    marginBottom: 4,
  } as ViewStyle,
});

const categoryStyle = registeredTextStyle('micro', colors.uto, 'category');
const labelStyle = registeredTextStyle('title', colors.uma, 'categoryLabel');

export const CategoryAndLabel = (props: CategoryAndLabelProps) => (
  <View style={[styles.Wrapper, props.style]}>
    <View style={styles.Category}>
      <Text style={categoryStyle}>{props.category.toUpperCase()}</Text>
    </View>
    <Text style={labelStyle}>{props.label}</Text>
  </View>
);

export default CategoryAndLabel;
