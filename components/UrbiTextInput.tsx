import * as React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { textStyle as makeTextStyle } from "Urbi/utils/textStyles";
import { colors } from "Urbi/utils/colors";

type UrbiTextInputProps = {
  autoFocus?: boolean;
  fieldName: string;
  label: string;
  placeholder: string;
  state: {
    focused: string;
    [key: string]: string;
  };
  setState: (v: any) => any;
};

export class UrbiTextInput extends React.Component<UrbiTextInputProps> {
  render() {
    const {
      autoFocus,
      fieldName,
      label,
      placeholder,
      setState,
      state
    } = this.props;
    return (
      <View style={styles.Container}>
        <Text style={styles.Text}>{label.toUpperCase()}</Text>
        <TextInput
          style={[
            styles.TextInput,
            state.focused === fieldName ? styles.TextInputFocused : null
          ]}
          onChangeText={fieldValue => setState({ [fieldName]: fieldValue })}
          value={state[fieldName]}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onFocus={() => setState({ focused: fieldName })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    height: 84
  },
  Text: {
    ...makeTextStyle("small", colors.uto),
    height: 40,
    paddingTop: 16
  },
  TextInput: {
    height: 20,
    ...makeTextStyle("body", colors.uma),
    borderColor: colors.ukko,
    borderBottomWidth: 1
  },
  TextInputFocused: {
    borderColor: colors.uma
  }
});
