import * as React from "react";
import IconButton from "Urbi/molecules/buttons/IconButton";
import {
  height,
  iconHeight
} from "Urbi/molecules/buttons/IconButtonCompactPrimary";
import { ButtonProps } from "Urbi/molecules/buttons/types";
import { colors } from "Urbi/utils/colors";

const IconButtonCompactDefault = (props: ButtonProps) => (
  <IconButton
    backgroundColor={colors.ulisse}
    color={colors.primary}
    height={height}
    iconHeight={iconHeight}
    borderColor={colors.ukko}
    borderWidth={1}
    {...props}
  />
);

export default IconButtonCompactDefault;
