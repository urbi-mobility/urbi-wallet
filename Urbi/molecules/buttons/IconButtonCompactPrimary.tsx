import * as React from "react";
import IconButton from "Urbi/molecules/buttons/IconButton";
import { ButtonProps } from "Urbi/molecules/buttons/types";
import { colors } from "Urbi/utils/colors";

export const height = 24;
export const iconHeight = 14; // TODO replace with 20 once we have our own icon font (with padding)

const IconButtonCompactPrimary = (props: ButtonProps) => (
  <IconButton
    backgroundColor={colors.primary}
    color={colors.ulisse}
    height={height}
    iconHeight={iconHeight}
    {...props}
  />
);

export default IconButtonCompactPrimary;
