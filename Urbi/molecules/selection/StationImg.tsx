import * as React from 'react';
import { Image, ImageRequireSource, ImageStyle, StyleSheet, View, ViewStyle } from 'react-native';

type StationImgProps = {
  providerLogo: ImageRequireSource;
};

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    height: 66,
  } as ViewStyle,
  Image: {
    height: 30,
    width: 30,
  } as ImageStyle,
});

export const StationImg = (props: StationImgProps) => (
  <View style={styles.Wrapper}>
    <Image source={props.providerLogo} style={styles.Image} />
  </View>
);

export default StationImg;
