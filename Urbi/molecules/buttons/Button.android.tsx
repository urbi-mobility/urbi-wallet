import * as React from "react";
import {
  RegisteredStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableNativeFeedback,
  View,
  ViewStyle
} from "react-native";
import { ExtendedButtonProps } from "Urbi/molecules/buttons/types";
import { colors } from "Urbi/utils/colors";
import { textStyle } from "Urbi/utils/textStyles";

class Button extends React.PureComponent<ExtendedButtonProps> {
  styles: {
    Wrapper: RegisteredStyle<ViewStyle>;
    Button: RegisteredStyle<ViewStyle>;
  };

  constructor(props: ExtendedButtonProps) {
    super(props);
    const { height, horizontalPadding, maxWidth, minWidth } = props;
    this.styles = StyleSheet.create({
      Wrapper: {
        flex: 1,
        borderRadius: height / 2,
        overflow: "hidden",
        marginBottom: 1,
        maxWidth,
        minWidth,
        maxHeight: height
      } as ViewStyle,
      Button: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: height / 2,
        paddingLeft: horizontalPadding,
        paddingRight: horizontalPadding,
        height,
        maxWidth,
        minWidth,
        maxHeight: height
      } as ViewStyle
    });
  }

  getTextStyle() {
    return textStyle(
      this.props.textStyle,
      this.props.disabled ? colors.ulisse : this.props.color
    );
  }

  getDisabledDependentButtonStyles() {
    const { backgroundColor, borderColor, borderWidth, disabled } = this.props;
    return {
      borderColor: disabled ? undefined : borderColor,
      borderWidth: disabled ? undefined : borderWidth,
      backgroundColor: disabled ? colors.ursula : backgroundColor
    };
  }

  render() {
    const {
      backgroundColor,
      disabled,
      isUppercase,
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
          <View
            style={[
              this.styles.Button,
              this.getDisabledDependentButtonStyles()
            ]}
          >
            <Text style={this.getTextStyle()}>
              {isUppercase ? label.toUpperCase() : label}
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

export default Button;
