import type { StyleFunctionProps } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const overrides = {
  config: { initialColorMode: "light", useSystemColorMode: false },
  styles: {
    global: (props: StyleFunctionProps) => ({
      html: {
        overflowX: "hidden",
      },
      // body: {
      //   color: props.colorMode === "dark" ? "whiteAlpha.900" : "gray.800",
      //   bg: props.colorMode === "dark" ? "#0d1119" : "#f6f6f6",
      //   overflowX: "hidden",
      // },
    }),
  },
  direction: "rtl",
  fonts: {
    // body: "Tajawal",
    // heading: "Tajawal",
  },
  colors: {
    //
  },
};

export default extendTheme(overrides);
