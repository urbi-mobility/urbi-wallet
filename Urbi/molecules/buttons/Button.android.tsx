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
    Text: RegisteredStyle<TextStyle>;
  };

  constructor(props: ExtendedButtonProps) {
    super(props);
    const {
      backgroundColor,
      color,
      disabled,
      height,
      horizontalPadding,
      maxWidth,
      minWidth
    } = props;
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
        borderColor: disabled ? undefined : props.borderColor,
        borderWidth: disabled ? undefined : props.borderWidth,
        paddingLeft: horizontalPadding,
        paddingRight: horizontalPadding,
        height,
        backgroundColor: disabled ? colors.ursula : backgroundColor,
        maxWidth,
        minWidth,
        maxHeight: height
      } as ViewStyle,
      Text: textStyle(this.props.textStyle, disabled ? colors.ulisse : color)
    });
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
          <View style={this.styles.Button}>
            <Text style={this.styles.Text}>
              {isUppercase ? label.toUpperCase() : label}
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

export default Button;
