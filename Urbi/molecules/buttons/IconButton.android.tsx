import * as React from "react";
import {
  RegisteredStyle,
  StyleSheet,
  TouchableNativeFeedback,
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
        overflow: "hidden",
        marginBottom: 1,
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
        height
      } as ViewStyle
    });
  }

  render() {
    const {
      backgroundColor,
      color,
      disabled,
      iconHeight,
      label,
      onPress,
      style
    } = this.props;

    return (
      <View
        style={[this.styles.Wrapper, style]}
        elevation={backgroundColor === colors.transparent || disabled ? 0 : 1}
      >
        <TouchableNativeFeedback onPress={disabled ? undefined : onPress}>
          <View style={this.styles.Button}>
            <Icon
              name={label}
              size={iconHeight}
              color={disabled ? colors.ulisse : color}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

export default IconButton;
