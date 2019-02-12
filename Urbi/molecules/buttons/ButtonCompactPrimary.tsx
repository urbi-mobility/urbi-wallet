import * as React from "react";
import Button from "Urbi/molecules/buttons/Button";
import { ButtonProps } from "Urbi/molecules/buttons/types";
import { colors } from "Urbi/utils/colors";

export const height = 32;
export const horizontalPadding = 16;
export const maxWidth = 290;
export const minWidth = 110;

const ButtonCompactPrimary = (props: ButtonProps) => (
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

export default ButtonCompactPrimary;
