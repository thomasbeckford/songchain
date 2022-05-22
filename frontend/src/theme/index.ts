import { extendTheme } from "@chakra-ui/react";
import { colors } from "./base/colors";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const overrides = {
  config,
  colors,
};

export const chakraTheme = extendTheme(overrides);
