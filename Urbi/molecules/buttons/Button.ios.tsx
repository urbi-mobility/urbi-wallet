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
  };

  constructor(props: ExtendedButtonProps) {
    super(props);
    const { height, horizontalPadding, maxWidth, minWidth } = props;
    this.styles = StyleSheet.create({
      Button: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        borderRadius: height / 2,
        paddingLeft: horizontalPadding,
        paddingRight: horizontalPadding,
        shadowRadius: 0,
        height: height - 1,
        maxHeight: height - 1,
        marginBottom: 1,
        maxWidth,
        minWidth
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
      shadowColor: disabled ? undefined : colors.ursula,
      shadowOffset: disabled ? undefined : { height: 1, width: 0 },
      shadowOpacity: disabled ? undefined : 1,
      backgroundColor: disabled ? colors.ursula : backgroundColor
    };
  }

  render() {
    const { disabled, isUppercase, label, onPress, style } = this.props;

    return (
      <TouchableOpacity
        onPress={disabled ? undefined : onPress}
        style={[
          this.styles.Button,
          style,
          this.getDisabledDependentButtonStyles()
        ]}
      >
        <Text style={this.getTextStyle()}>
          {isUppercase ? label.toUpperCase() : label}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default Button;
