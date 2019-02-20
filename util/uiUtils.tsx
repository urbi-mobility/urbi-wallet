import { Alert, Clipboard } from "react-native";

export const popup = (message: string, title: string = "Alert") => {
  setTimeout(() => Alert.alert(title, message), 250);
};

export const prompt = (
  message: string,
  title: string,
  okHandler: () => any,
  okText: string = "Ok",
  cancelText: string = "Cancel"
) => {
  Alert.alert(title, message, [
    { text: cancelText },
    { text: okText, onPress: okHandler }
  ]);
};

const copy = (text: string) => () => Clipboard.setString(text);

export const popupWithCopy = (message: string, title: string) => {
  setTimeout(
    () =>
      Alert.alert(title, message, [
        { text: "Copy", onPress: copy(message) },
        { text: "Ok" }
      ]),
    100
  );
};

export const withSafeOverlay = (runnable: () => any) => {
  // https://github.com/joinspontaneous/react-native-loading-spinner-overlay#recommended-implementation
  // you had one job... 🤦
  setTimeout(runnable, 250);
};
