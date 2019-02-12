import { Alert, Platform, StatusBar, ToastAndroid } from 'react-native';
import { onIOS } from 'Urbi/utils/const';

export const statusBarHeight = StatusBar.currentHeight || 0;

export const showAlert = (message: string, titleIOS?: string, messageIOS?: string) => {
  if (onIOS) Alert.alert(titleIOS || 'Alert', messageIOS || message);
  else ToastAndroid.show(message, ToastAndroid.SHORT);
};

// tslint:disable-next-line:no-console
export const showWarning = (message: string) => console.warn(message);

export const onPress = (message: string, titleIOS?: string, messageIOS?: string) =>
  onIOS
    ? () => Alert.alert(titleIOS || 'Alert', messageIOS || message)
    : () => ToastAndroid.show(message, ToastAndroid.SHORT);

export const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));
