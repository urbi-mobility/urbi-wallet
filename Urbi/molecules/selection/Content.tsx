import React, { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Link from 'Urbi/molecules/buttons/Link';
import { colors } from 'Urbi/utils/colors';
import { registeredTextStyle } from 'Urbi/utils/textStyles';

type SelectionProps = {
  title: string;
  body: string;
  footer: string;
  link?: ReactElement<typeof Link>;
};

const styles = StyleSheet.create({
  Wrapper: {
    height: 66,
    flex: 1,
  },
  Title: {
    flexDirection: 'row',
  },
  Link: {
    marginLeft: 8,
  },
  Body: {
    marginBottom: 8,
  },
});

const titleTextStyle = registeredTextStyle('body', colors.uto, 'contentTitle');
const bodyTextStyle = registeredTextStyle('titleBold', colors.uma, 'contentBody');
const footerTextStyle = registeredTextStyle('title', colors.uma, 'contentFooter');

export const Selection = (props: SelectionProps) => (
  <View style={styles.Wrapper}>
    <View style={styles.Title}>
      <Text style={titleTextStyle} numberOfLines={1}>
        {props.title}
      </Text>
      <View style={styles.Link}>{props.link}</View>
    </View>
    <View style={styles.Body}>
      <Text style={bodyTextStyle} numberOfLines={1}>
        {props.body}
      </Text>
    </View>
    <Text style={footerTextStyle} numberOfLines={1}>
      {props.footer}
    </Text>
  </View>
);

export default Selection;
