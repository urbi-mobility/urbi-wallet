import * as React from 'react';
import {
  Image,
  ImageRequireSource,
  RegisteredStyle,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { colors } from 'Urbi/utils/colors';
import { Icon } from 'Urbi/utils/const';
import { registeredTextStyle } from 'Urbi/utils/textStyles';
import { RequireOnlyOne } from 'Urbi/utils/types';

const styles = StyleSheet.create({
  Wrapper: {
    minHeight: 40,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const textStyle = registeredTextStyle('title', colors.uma, 'IconAndLabel');

type ExpandedIconAndLabelProps = {
  image?: ImageRequireSource;
  icon?: string;
  label: string;
  style?: ViewStyle | RegisteredStyle<ViewStyle>;
  smallIcon?: boolean;
};

type IconAndLabelProps = RequireOnlyOne<ExpandedIconAndLabelProps, 'image' | 'icon'>;

const renderImageOrIcon = (size: number, image?: ImageRequireSource, icon?: string) => {
  return image ? (
    <Image style={{ width: size, height: size }} source={image} />
  ) : (
    <Icon name={icon!} size={size} />
  );
};

export const IconAndLabel = (props: IconAndLabelProps) => {
  const { icon, image, label, smallIcon, style } = props;
  const iconSize = smallIcon ? 20 : 40;
  return (
    <View style={[styles.Wrapper, style]}>
      <View style={{ minWidth: iconSize, marginRight: 8 }}>
        {renderImageOrIcon(iconSize, image, icon)}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={textStyle} numberOfLines={1}>
          {label}
        </Text>
      </View>
    </View>
  );
};

export default IconAndLabel;
