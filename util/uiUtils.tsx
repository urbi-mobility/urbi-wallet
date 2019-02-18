import { Alert } from "react-native";

export const popup = (message: string, title: string = "Alert") => {
  setTimeout(() => Alert.alert(title, message), 250);
};
