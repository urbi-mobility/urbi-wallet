import * as React from 'react';
import {
  Image,
  ImageRequireSource,
  ImageStyle,
  RegisteredStyle,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

type Styles = {
  Wrapper: RegisteredStyle<ViewStyle>;
  ContentWithEnd: RegisteredStyle<ViewStyle>;
  ContentWithIcon: RegisteredStyle<ViewStyle>;
  Action: RegisteredStyle<ImageStyle>;
};

const styles: Styles = StyleSheet.create({
  Wrapper: {
    height: 56,
    paddingTop: 8,
    paddingRight: 12,
    paddingBottom: 8,
    paddingLeft: 16,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  ContentWithEnd: { flex: 3, marginRight: 8 } as ViewStyle,
  ContentWithIcon: { marginRight: 8 } as ViewStyle,
  Action: {
    width: 20,
    height: 20,
  } as ImageStyle,
});

export type ListItemProps = {
  content: JSX.Element;
  icon?: ImageRequireSource;
  end?: JSX.Element;
};

const withStyle = (props: ListItemProps) => {
  const { icon, content, end } = props;
  return React.cloneElement(content, {
    style: end ? styles.ContentWithEnd : icon ? styles.ContentWithIcon : null,
  });
};

export const ListItem = (props: ListItemProps) => (
  <View style={styles.Wrapper}>
    {withStyle(props)}
    {props.icon ? <Image source={props.icon!} style={styles.Action} /> : null}
    {props.end}
  </View>
);

export default ListItem;
