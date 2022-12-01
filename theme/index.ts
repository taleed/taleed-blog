import type { StyleFunctionProps } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const overrides = {
  config: { initialColorMode: "light", useSystemColorMode: false },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        color: props.colorMode === "dark" ? "white" : "brand.black",
        bg: props.colorMode === "dark" ? "brand.black" : "white",
        overflowX: "hidden",
      },
      ".post-content p": {
        fontSize: "1.375rem",
        fontWeight: 500,
        lineHeight: "46px",
      },
      ".post-content h3": {
        fontSize: "3xl",
        fontWeight: 600,
        lineHeight: "55.2px",
      },
      ".post-content ul, .post-content ol": {
        paddingRight: "24px",
      },
    }),
  },
  direction: "rtl",
  fonts: {
    heading: `"Tajawal", "Changa", sans-serif`,
    body: `"Tajawal", "Changa", sans-serif`,
  },
  colors: {
    brand: {
      primary: "#4C31BC",
      secondary: "#06D3F4",
      black: "#222",
    },
    purple: {
      100: "#EDEAF8",
      200: "#B8A8F6",
      300: "#7C62E5",
      400: "#6A4DE1",
      500: "#3A229D",
    },
    grey: {
      100: "#F5F5F6",
      200: "#E7E8E8",
      300: "#D6D6D6",
      400: "#A5A6A6",
      500: "#828788",
      600: "#6C6E6F",
      700: "#2F3133",
      800: "#414447",
      900: "#2F3133",
    },
  },
};

export default extendTheme(overrides);
