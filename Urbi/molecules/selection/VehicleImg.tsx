import * as React from 'react';
import { Image, ImageRequireSource, StyleSheet, View, ViewStyle } from 'react-native';

type VehicleImgProps = {
  image: ImageRequireSource;
};

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    height: 66,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    width: 110,
  } as ViewStyle,
});

export const VehicleImg = (props: VehicleImgProps) => (
  <View style={styles.Wrapper}>
    <Image source={props.image} />
  </View>
);

export default VehicleImg;
