import "@fontsource/changa";

import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeContextProvider } from "context/colormode";
import Layout from "@/utils/layout";
import theme from "theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    
      <ChakraProvider theme={theme}>
        <ColorModeContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ColorModeContextProvider>
      </ChakraProvider>
    
  );
}

export default MyApp;
