import * as React from "react";
import Button from "Urbi/molecules/buttons/Button";
import {
  height,
  horizontalPadding,
  maxWidth,
  minWidth
} from "Urbi/molecules/buttons/ButtonPrimary";
import { ButtonProps } from "Urbi/molecules/buttons/types";
import { colors } from "Urbi/utils/colors";

const ButtonDefault = (props: ButtonProps) => (
  <Button
    backgroundColor={colors.ulisse}
    borderColor={colors.ukko}
    borderWidth={1}
    color={colors.primary}
    height={height}
    horizontalPadding={horizontalPadding}
    maxWidth={maxWidth}
    minWidth={minWidth}
    textStyle="bodyBold"
    isUppercase
    {...props}
  />
);

export default ButtonDefault;
