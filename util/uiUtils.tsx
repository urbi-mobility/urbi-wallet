import { Alert } from "react-native";

export const popup = (message: string, title: string = "Alert") => {
  setTimeout(() => Alert.alert(title, message), 250);
};

export const prompt = (
  message: string,
  title: string,
  okHandler: () => any,
  okText: string = "OK",
  cancelText: string = "Cancel"
) => {
  Alert.alert(title, message, [
    { text: cancelText },
    { text: okText, onPress: okHandler }
  ]);
};
