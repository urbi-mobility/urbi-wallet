import * as React from 'react';
import { Image, ImageStyle, StyleSheet, View, ViewStyle } from 'react-native';
import { ListItemProps } from 'Urbi/components/ListItem';

const styles = StyleSheet.create({
  Wrapper: {
    height: 64,
    padding: 12,
    paddingLeft: 16,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  ContentWithEnd: { flex: 3, marginRight: 8 },
  ContentWithIcon: { marginRight: 8 },
  Action: {
    width: 20,
    height: 20,
  } as ImageStyle,
});

const withStyle = (props: ListItemProps) => {
  const { icon, content, end } = props;
  return React.cloneElement(content, {
    style: end ? styles.ContentWithEnd : icon ? styles.ContentWithIcon : null,
  });
};

export const ListItemDouble = (props: ListItemProps) => (
  <View style={styles.Wrapper}>
    {withStyle(props)}
    {props.icon ? <Image source={props.icon!} style={styles.Action} /> : null}
    {props.end}
  </View>
);

export default ListItemDouble;
