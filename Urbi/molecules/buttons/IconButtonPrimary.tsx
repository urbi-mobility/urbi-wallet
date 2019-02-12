import * as React from "react";
import IconButton from "Urbi/molecules/buttons/IconButton";
import { ButtonProps } from "Urbi/molecules/buttons/types";
import { colors } from "Urbi/utils/colors";

export const height = 44;
export const iconHeight = 30; // TODO replace with 40 once we have our own icon font (with padding)

const IconButtonPrimary = (props: ButtonProps) => (
  <IconButton
    backgroundColor={colors.primary}
    color={colors.ulisse}
    height={height}
    iconHeight={iconHeight}
    {...props}
  />
);

export default IconButtonPrimary;
