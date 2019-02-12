import { ReactElement } from "react";
import { Image, ImageRequireSource, ViewStyle } from "react-native";
import { fontStyles } from "Urbi/utils/textStyles";

export interface ButtonProps {
  label: string;
  onPress: () => any;
  disabled?: boolean;
}

export interface ExtendedButtonProps extends ButtonProps {
  backgroundColor: string;
  borderColor?: string;
  borderWidth?: number;
  color: string;
  height: number;
  horizontalPadding: number;
  isUppercase: boolean;
  maxWidth: number;
  minWidth: number;
  textStyle: keyof typeof fontStyles;
  style?: ViewStyle;
}

export interface IconButtonProps extends ButtonProps {
  backgroundColor: string;
  color: string;
  height: number;
  iconHeight: number;
  borderColor?: string;
  borderWidth?: number;
  style?: ViewStyle;
}

export interface ToggleableProps {
  active: boolean;
  setActive: (id: string, isActive: boolean) => void;
  id: string;
  style?: ViewStyle;
  managed?: boolean; // whether the state of this button is managed through props
}

export interface ToggleProps extends ToggleableProps {
  height: number;
  content: (active: boolean) => ReactElement<Icon> | ReactElement<Image>;
  styleFunction: (active: boolean) => ViewStyle;
}

export interface FilterButtonProps extends ToggleableProps {
  icon: string;
}

export interface ImageButtonProps extends ToggleableProps {
  image: ImageRequireSource;
}

export interface FilterButtonSettingsProps {
  onClick: () => void;
  style?: ViewStyle;
}
