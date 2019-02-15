import * as React from "react";
import { NavigationScreenProps } from "react-navigation";
import { StyleSheet, View, findNodeHandle } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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

  scroll?: JSX.Element;

  lastNameRef = React.createRef<UrbiTextInput>();
  nationalityRef = React.createRef<UrbiTextInput>();
  birthDateRef = React.createRef<UrbiTextInput>();
  birthLocalityRef = React.createRef<UrbiTextInput>();
  birthProvinceRef = React.createRef<UrbiTextInput>();
  birthCountryRef = React.createRef<UrbiTextInput>();
  addressRef = React.createRef<UrbiTextInput>();
  zipRef = React.createRef<UrbiTextInput>();
  countryRef = React.createRef<UrbiTextInput>();
  phoneNumberRef = React.createRef<UrbiTextInput>();
  dlNumberRef = React.createRef<UrbiTextInput>();
  dlIssuerRef = React.createRef<UrbiTextInput>();
  dlIssueDateRef = React.createRef<UrbiTextInput>();
  dlExpirationDateRef = React.createRef<UrbiTextInput>();

  constructor(props: NavigationScreenProps) {
    super(props);
    this.toggleLicense = this.toggleLicense.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
  }

  componentDidMount() {
    SecureStore.getItemAsync("data").then(stored => {
      if (stored) {
        this.setState(JSON.parse(stored));
      }
    });
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

  scrollTo(textInput: ReturnType<typeof findNodeHandle>) {
    this.scroll!.props.scrollToFocusedInput(textInput);
  }

  toggleLicense(type: string) {
    return () =>
      this.setState({
        dlLevels: { ...this.state.dlLevels, [type]: !this.state.dlLevels[type] }
      });
  }

  render() {
    return (
      <KeyboardAwareScrollView innerRef={ref => (this.scroll = ref)}>
        <View style={styles.Form}>
          <UrbiTextInput
            fieldName="firstName"
            label="first name"
            placeholder="Your first name"
            state={this.state}
            setState={this.setState.bind(this)}
            onSubmitEditing={() => this.lastNameRef.current!.focus()}
            scroll={this.scrollTo}
            autoFocus
          />
          <UrbiTextInput
            fieldName="lastName"
            ref={this.lastNameRef}
            label="last name"
            placeholder="Your last name"
            state={this.state}
            setState={this.setState.bind(this)}
            onSubmitEditing={() => this.nationalityRef.current!.focus()}
            scroll={this.scrollTo}
          />
          <UrbiTextInput
            fieldName="nationality"
            ref={this.nationalityRef}
            label="nationality"
            placeholder="2-letter code"
            state={this.state}
            setState={this.setState.bind(this)}
            onSubmitEditing={() => this.birthDateRef.current!.focus()}
            scroll={this.scrollTo}
          />
          <UrbiTextInput
            fieldName="birthDate"
            ref={this.birthDateRef}
            label="date of birth"
            placeholder="YYYY-mm-DD"
            state={this.state}
            setState={this.setState.bind(this)}
            onSubmitEditing={() => this.birthLocalityRef.current!.focus()}
            scroll={this.scrollTo}
          />
          <UrbiTextInput
            fieldName="birthLocality"
            ref={this.birthLocalityRef}
            label="place of birth"
            placeholder="City of birth"
            state={this.state}
            setState={this.setState.bind(this)}
            onSubmitEditing={() => this.birthProvinceRef.current!.focus()}
            scroll={this.scrollTo}
          />
          <UrbiTextInput
            fieldName="birthProvince"
            ref={this.birthProvinceRef}
            label="province of birth"
            placeholder="2-letter code"
            state={this.state}
            setState={this.setState.bind(this)}
            onSubmitEditing={() => this.birthCountryRef.current!.focus()}
            scroll={this.scrollTo}
          />
          <UrbiTextInput
            fieldName="birthCountry"
            ref={this.birthCountryRef}
            label="country of birth"
            placeholder="Full country name"
            state={this.state}
            setState={this.setState.bind(this)}
            onSubmitEditing={() => this.addressRef.current!.focus()}
            scroll={this.scrollTo}
          />
          <UrbiTextInput
            fieldName="address"
            ref={this.addressRef}
            label="address"
            placeholder="Street and street number"
            state={this.state}
            setState={this.setState.bind(this)}
            onSubmitEditing={() => this.zipRef.current!.focus()}
            scroll={this.scrollTo}
          />
          <UrbiTextInput
            fieldName="zip"
            ref={this.zipRef}
            label="zip code"
            placeholder="ZIP code"
            state={this.state}
            setState={this.setState.bind(this)}
            onSubmitEditing={() => this.countryRef.current!.focus()}
            scroll={this.scrollTo}
          />
          <UrbiTextInput
            fieldName="country"
            ref={this.countryRef}
            label="country of residence"
            placeholder="Full country name"
            state={this.state}
            setState={this.setState.bind(this)}
            onSubmitEditing={() => this.phoneNumberRef.current!.focus()}
            scroll={this.scrollTo}
          />
          <UrbiTextInput
            fieldName="phoneNumber"
            ref={this.phoneNumberRef}
            label="phone number"
            placeholder="International prefix included"
            state={this.state}
            setState={this.setState.bind(this)}
            onSubmitEditing={() => this.dlNumberRef.current!.focus()}
            scroll={this.scrollTo}
          />
        </View>
        <SectionsDivider label="Driving license data" />
        <View style={styles.Form}>
          <UrbiTextInput
            fieldName="dlNumber"
            ref={this.dlNumberRef}
            label="driving license number"
            placeholder="Full code"
            state={this.state}
            setState={this.setState.bind(this)}
            onSubmitEditing={() => this.dlIssuerRef.current!.focus()}
            scroll={this.scrollTo}
          />
          <UrbiTextInput
            fieldName="dlIssuer"
            ref={this.dlIssuerRef}
            label="issued by"
            placeholder="Entity that released the driving license"
            state={this.state}
            setState={this.setState.bind(this)}
            onSubmitEditing={() => this.dlIssueDateRef.current!.focus()}
            scroll={this.scrollTo}
          />
          <UrbiTextInput
            fieldName="dlIssueDate"
            ref={this.dlIssueDateRef}
            label="issue date"
            placeholder="YYYY-mm-DD"
            state={this.state}
            setState={this.setState.bind(this)}
            onSubmitEditing={() => this.dlExpirationDateRef.current!.focus()}
            scroll={this.scrollTo}
          />
          <UrbiTextInput
            fieldName="dlExpirationDate"
            ref={this.dlExpirationDateRef}
            label="expiration date"
            placeholder="YYYY-mm-DD"
            state={this.state}
            setState={this.setState.bind(this)}
            scroll={this.scrollTo}
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
      </KeyboardAwareScrollView>
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
