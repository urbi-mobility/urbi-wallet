import numeral from 'numeral';
import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ShopItem } from 'Urbi/redux/shop/types';
import { colors } from 'Urbi/utils/colors';
import { registeredTextStyle } from 'Urbi/utils/textStyles';

const styles = StyleSheet.create({
  Wrapper: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#fafafa',
  },
  Image: {
    flex: 1,
  },
  Desc: {
    flex: 3,
    flexDirection: 'column',
  },
  Name: {
    fontSize: 16,
  },
  PriceTime: {
    flex: 1,
    flexDirection: 'column',
  },
});

const textStyle = registeredTextStyle('body', colors.uma, 'shop-name');
const priceStyle = registeredTextStyle('bodyBold', colors.uma, 'shop-price');
const providerStyle = registeredTextStyle('micro', colors.ughina, 'shop-provider');

const ShopListItem = (item: ShopItem) => (
  <View style={styles.Wrapper}>
    <View style={styles.Image}>
      <Image source={item.image} />
    </View>
    <View style={styles.Desc}>
      <View>
        <Text style={textStyle}>{item.name}</Text>
      </View>
      <View>
        <Text style={providerStyle}>{(item.provider || '').toUpperCase()}</Text>
      </View>
    </View>
    <View style={styles.PriceTime}>
      <View>
        <Text style={priceStyle}>€ {numeral(item.price / 100).format('0[.]00')}</Text>
      </View>
      <View>
        <Text style={priceStyle}>{item.time !== undefined ? `${item.time / 60} mins` : ''}</Text>
      </View>
    </View>
  </View>
);

export default ShopListItem;
