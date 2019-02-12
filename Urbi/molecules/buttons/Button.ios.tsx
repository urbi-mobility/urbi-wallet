import * as React from "react";
import {
  RegisteredStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle
} from "react-native";
import { ExtendedButtonProps } from "Urbi/molecules/buttons/types";
import { colors } from "Urbi/utils/colors";
import { textStyle } from "Urbi/utils/textStyles";

class Button extends React.PureComponent<ExtendedButtonProps> {
  styles: {
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
      Button: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        borderRadius: height / 2,
        borderColor: disabled ? undefined : props.borderColor,
        borderWidth: disabled ? undefined : props.borderWidth,
        paddingLeft: horizontalPadding,
        paddingRight: horizontalPadding,
        shadowColor: disabled ? undefined : colors.ursula,
        shadowOffset: disabled ? undefined : { height: 1, width: 0 },
        shadowOpacity: disabled ? undefined : 1,
        shadowRadius: 0,
        height: height - 1,
        maxHeight: height - 1,
        marginBottom: 1,
        backgroundColor: disabled ? colors.ursula : backgroundColor,
        maxWidth,
        minWidth
      } as ViewStyle,
      Text: textStyle(this.props.textStyle, disabled ? colors.ulisse : color)
    });
  }

  render() {
    const { disabled, isUppercase, label, onPress, style } = this.props;

    return (
      <TouchableOpacity
        onPress={disabled ? undefined : onPress}
        style={[this.styles.Button, style]}
      >
        <Text style={this.styles.Text}>
          {isUppercase ? label.toUpperCase() : label}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default Button;
