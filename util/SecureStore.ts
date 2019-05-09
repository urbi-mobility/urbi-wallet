import * as Keychain from "react-native-keychain";

const SecureStore = {
  getItemAsync: async (key: string) => {
    const value = await Keychain.getInternetCredentials(`urbiwallet-${key}`);
    if (value) {
      return value.password;
    }
    return undefined;
  },
  setItemAsync: async (key: string, value: string) => {
    await Keychain.setInternetCredentials(
      `urbiwallet-${key}`,
      "urbiwallet",
      value
    );
  },
  deleteItemAsync: async (key: string) =>
    Keychain.resetInternetCredentials(`urbiwallet-${key}`)
};

export default SecureStore;
