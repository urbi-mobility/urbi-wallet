import * as React from 'react';
import { Image, ImageRequireSource, ImageStyle, StyleSheet, View, ViewStyle } from 'react-native';

type BikeImgProps = {
  image: ImageRequireSource;
  providerLogo: ImageRequireSource;
};

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    height: 66,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  } as ViewStyle,
  ProviderLogo: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 30,
    width: 30,
  } as ImageStyle,
});

export const BikeImg = (props: BikeImgProps) => (
  <View style={styles.Wrapper}>
    <Image source={props.image} />
    <Image source={props.providerLogo} style={styles.ProviderLogo} />
  </View>
);

export default BikeImg;
