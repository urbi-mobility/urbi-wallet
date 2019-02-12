import * as React from "react";
import {
  RegisteredStyle,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import { IconButtonProps } from "Urbi/molecules/buttons/types";
import { colors } from "Urbi/utils/colors";
import { Icon } from "Urbi/utils/const";

class IconButton extends React.PureComponent<IconButtonProps> {
  styles: {
    Wrapper: RegisteredStyle<ViewStyle>;
    Button: RegisteredStyle<ViewStyle>;
  };

  constructor(props: IconButtonProps) {
    super(props);
    const { backgroundColor, disabled, height } = props;
    this.styles = StyleSheet.create({
      Wrapper: {
        borderRadius: height / 2,
        width: height,
        height
      } as ViewStyle,
      Button: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: height / 2,
        borderColor: disabled ? undefined : props.borderColor,
        borderWidth: disabled ? undefined : props.borderWidth,
        backgroundColor: disabled ? colors.ursula : backgroundColor,
        marginBottom: 1,
        shadowColor: disabled ? undefined : colors.ursula,
        shadowOffset: disabled ? undefined : { height: 1, width: 0 },
        shadowOpacity: disabled
          ? undefined
          : backgroundColor === colors.transparent
          ? 0
          : 1,
        shadowRadius: 0,
        width: height,
        height
      } as ViewStyle
    });
  }

  render() {
    const { color, disabled, iconHeight, label, onPress, style } = this.props;

    return (
      <TouchableOpacity
        onPress={disabled ? undefined : onPress}
        style={[this.styles.Button, style]}
      >
        <Icon
          name={label}
          size={iconHeight}
          color={disabled ? colors.ulisse : color}
        />
      </TouchableOpacity>
    );
  }
}

export default IconButton;
