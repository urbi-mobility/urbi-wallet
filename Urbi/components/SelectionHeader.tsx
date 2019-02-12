import React, { ReactElement } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import BikeImg from 'Urbi/molecules/selection/BikeImg';
import Content from 'Urbi/molecules/selection/Content';
import StationImg from 'Urbi/molecules/selection/StationImg';
import VehicleImg from 'Urbi/molecules/selection/VehicleImg';

type SelectionHeaderProps = {
  content: ReactElement<typeof Content>;
  img:
    | ReactElement<typeof VehicleImg>
    | ReactElement<typeof BikeImg>
    | ReactElement<typeof StationImg>;
};

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    flexDirection: 'row',
    height: 70,
    paddingLeft: 16,
    paddingRight: 12,
    paddingBottom: 8,
  } as ViewStyle,
});

export const SelectionHeader = (props: SelectionHeaderProps) => (
  <View style={styles.Wrapper}>
    {props.content}
    {props.img}
  </View>
);

export default SelectionHeader;
