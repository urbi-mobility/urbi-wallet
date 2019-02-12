import * as React from "react";
import IconButton from "Urbi/molecules/buttons/IconButton";
import {
  height,
  iconHeight
} from "Urbi/molecules/buttons/IconButtonCompactPrimary";
import { ButtonProps } from "Urbi/molecules/buttons/types";
import { colors } from "Urbi/utils/colors";

const IconButtonCompactSecondary = (props: ButtonProps) => (
  <IconButton
    backgroundColor={colors.transparent}
    color={colors.primary}
    height={height}
    iconHeight={iconHeight}
    {...props}
  />
);

export default IconButtonCompactSecondary;
