import * as React from "react";
import { NavigationScreenProps } from "react-navigation";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { serializeToJson } from "urbi-wallet/util/jsonUtils";
import { SecureStore } from "expo";
import testIdentity from "urbi-wallet/assets/testIdentity.json";
import { textStyle as makeTextStyle } from "Urbi/utils/textStyles";
import { colors } from "Urbi/utils/colors";
import ButtonPrimary from "Urbi/molecules/buttons/ButtonPrimary";
import { UrbiTextInput } from "urbi-wallet/components/UrbiTextInput";
import ListItemSwitch from "Urbi/components/ListItemSwitch";
import Label from "Urbi/molecules/content/Label";
import SectionsDivider from "Urbi/molecules/SectionsDivider";

const drivingLicenseTypes = ["A", "A1", "B", "C1", "C", "D"];

class DrivingLicenseScreen extends React.Component<NavigationScreenProps> {
  static navigationOptions = {
    title: "Personal data"
  };

  state = {
    ...testIdentity,
    focused: "firstName"
  };

  constructor(props: NavigationScreenProps) {
    super(props);
    this.toggleLicense = this.toggleLicense.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    SecureStore.getItemAsync("data").then(stored => {
      if (stored) {
        this.setState(JSON.parse(stored));
      }
    });
  }

  componentWillUnmount() {
    console.log("driving license will unmount");
  }

  onSubmit() {
    const data: any = { dlLevels: {} };
    const notStrings = { focused: true, dlLevels: true };

    Object.keys(this.state)
      .filter(k => !(k in notStrings))
      .forEach(k => {
        const v = (this.state[k] || "").trim();
        if (v) {
          data[k] = v;
        }
      });

    drivingLicenseTypes.forEach(t => {
      if (this.state.dlLevels[t]) {
        data.dlLevels[t] = true;
      }
    });

    SecureStore.setItemAsync("data", serializeToJson(data))
      .then(() => window.alert("stored!"))
      .catch(e => window.alert(`oh no. Oh no no no. ${e}`));
  }

  toggleLicense(type: string) {
    return () =>
      this.setState({
        dlLevels: { ...this.state.dlLevels, [type]: !this.state.dlLevels[type] }
      });
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.Form}>
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
        </View>
        <SectionsDivider label="Driving license data" />
        <View style={styles.Form}>
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
        </View>
        <SectionsDivider label="Driving license type" />
        {drivingLicenseTypes.map(t => (
          <ListItemSwitch
            key={`drivingLicenseType-${t}`}
            content={<Label text={t} />}
            onSwitchToggle={this.toggleLicense(t)}
            enabled={this.state.dlLevels[t]}
          />
        ))}
        <View style={styles.BottomButton}>
          <ButtonPrimary label="Store securely" onPress={this.onSubmit} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  Form: {
    paddingLeft: 16,
    paddingRight: 16
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
