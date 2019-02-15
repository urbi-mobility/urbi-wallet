import * as React from "react";
import {
  findNodeHandle,
  StyleSheet,
  Text,
  TextInput,
  View,
  NativeSyntheticEvent,
  TextInputFocusEventData
} from "react-native";
import { textStyle as makeTextStyle } from "Urbi/utils/textStyles";
import { colors } from "Urbi/utils/colors";

type UrbiTextInputProps = {
  autoFocus?: boolean;
  fieldName: string;
  label: string;
  placeholder: string;
  scroll: (node: ReturnType<typeof findNodeHandle>) => any;
  state: {
    focused: string;
    [key: string]: string;
  };
  onSubmitEditing?: () => any;
  setState: (v: any) => any;
};

export class UrbiTextInput extends React.Component<UrbiTextInputProps> {
  ref = React.createRef<TextInput>();

  constructor(props: UrbiTextInputProps) {
    super(props);
    this.onFocus = this.onFocus.bind(this);
  }

  focus() {
    this.ref.current!.focus();
  }

  onFocus(event: NativeSyntheticEvent<TextInputFocusEventData>) {
    this.props.setState({ focused: this.props.fieldName });
    this.props.scroll(findNodeHandle(event.target));
  }

  render() {
    const {
      autoFocus,
      fieldName,
      label,
      onSubmitEditing,
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
          ref={this.ref}
          onChangeText={fieldValue => setState({ [fieldName]: fieldValue })}
          value={state[fieldName]}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onSubmitEditing={onSubmitEditing}
          onFocus={this.onFocus}
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
