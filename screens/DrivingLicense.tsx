import * as React from "react";
import { NavigationScreenProps } from "react-navigation";
import { Platform, StyleSheet, Text, View, ScrollView } from "react-native";
import { Linking } from "expo";
import { serializeToJson } from "urbi-wallet/util/jsonUtils";
import testIdentity from "urbi-wallet/assets/testIdentity.json";
import { textStyle as makeTextStyle } from "Urbi/utils/textStyles";
import { colors } from "Urbi/utils/colors";
import ButtonPrimary from "Urbi/molecules/buttons/ButtonPrimary";
import { UrbiTextInput } from "urbi-wallet/components/UrbiTextInput";

class DrivingLicenseScreen extends React.Component<NavigationScreenProps> {
  static navigationOptions = {
    title: "Driving license"
  };

  state = {
    ...testIdentity,
    focused: "firstName"
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.Container}>
        <UrbiTextInput
          fieldName="firstName"
          label="first name"
          placeholder="Your first name"
          state={this.state}
          setState={this.setState.bind(this)}
          autoFocus
        />
        <UrbiTextInput
          fieldName="lastName"
          label="last name"
          placeholder="Your last name"
          state={this.state}
          setState={this.setState.bind(this)}
        />
        <UrbiTextInput
          fieldName="dlNumber"
          label="driving license number"
          placeholder="Full code"
          state={this.state}
          setState={this.setState.bind(this)}
        />
        <UrbiTextInput
          fieldName="dlIssuer"
          label="issued by"
          placeholder="Entity that released the driving license"
          state={this.state}
          setState={this.setState.bind(this)}
        />
        <UrbiTextInput
          fieldName="dlIssueDate"
          label="issue date"
          placeholder="YYYY-mm-DD"
          state={this.state}
          setState={this.setState.bind(this)}
        />
        <UrbiTextInput
          fieldName="dlExpirationDate"
          label="expiration date"
          placeholder="YYYY-mm-DD"
          state={this.state}
          setState={this.setState.bind(this)}
        />
        <UrbiTextInput
          fieldName="nationality"
          label="nationality"
          placeholder="2-letter code"
          state={this.state}
          setState={this.setState.bind(this)}
        />
        <UrbiTextInput
          fieldName="birthDate"
          label="date of birth"
          placeholder="YYYY-mm-DD"
          state={this.state}
          setState={this.setState.bind(this)}
        />
        <UrbiTextInput
          fieldName="birthLocality"
          label="place of birth"
          placeholder="City of birth"
          state={this.state}
          setState={this.setState.bind(this)}
        />
        <UrbiTextInput
          fieldName="birthProvince"
          label="province of birth"
          placeholder="2-letter code"
          state={this.state}
          setState={this.setState.bind(this)}
        />
        <UrbiTextInput
          fieldName="birthCountry"
          label="country of birth"
          placeholder="Full country name"
          state={this.state}
          setState={this.setState.bind(this)}
        />
        <UrbiTextInput
          fieldName="address"
          label="address"
          placeholder="Street and street number"
          state={this.state}
          setState={this.setState.bind(this)}
        />
        <UrbiTextInput
          fieldName="zip"
          label="zip code"
          placeholder="ZIP code"
          state={this.state}
          setState={this.setState.bind(this)}
        />
        <UrbiTextInput
          fieldName="country"
          label="country of residence"
          placeholder="Full country name"
          state={this.state}
          setState={this.setState.bind(this)}
        />
        <UrbiTextInput
          fieldName="phoneNumber"
          label="phone nuber"
          placeholder="International prefix included"
          state={this.state}
          setState={this.setState.bind(this)}
        />
        <View style={styles.BottomButton}>
          <ButtonPrimary
            label="Store securely"
            onPress={() => window.alert("All good 👍")}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    padding: 20
  },
  BottomButton: {
    flex: 1,
    padding: 20
  },
  TextInput: {
    height: 40,
    ...makeTextStyle("body", colors.uma),
    borderColor: colors.ukko,
    borderBottomWidth: 1
  },
  TextInputFocused: {
    borderColor: colors.uma
  }
});

export default DrivingLicenseScreen;
