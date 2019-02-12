import * as React from "react";
import Button from "Urbi/molecules/buttons/Button";
import { ButtonProps } from "Urbi/molecules/buttons/types";
import { colors } from "Urbi/utils/colors";

export const height = 44;
export const horizontalPadding = 20;
export const maxWidth = 660;
export const minWidth = 240;

const ButtonPrimary = (props: ButtonProps) => (
  <Button
    backgroundColor={colors.primary}
    color={colors.ulisse}
    height={height}
    horizontalPadding={horizontalPadding}
    maxWidth={maxWidth}
    minWidth={minWidth}
    textStyle="bodyBold"
    isUppercase
    {...props}
  />
);

export default ButtonPrimary;
