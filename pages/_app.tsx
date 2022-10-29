import "@fontsource/changa";

import { ChakraProvider, createLocalStorageManager } from "@chakra-ui/react";
import { ReactElement, ReactNode } from "react";

import type { AppProps } from "next/app";
import { NextPage } from "next";
import theme from "theme";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const manager = createLocalStorageManager("talleed-theme-mode");
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <ChakraProvider theme={theme} colorModeManager={manager}>
      {getLayout(<Component {...pageProps} />)}
      {/* <Layout>
        <Component {...pageProps} />
      </Layout> */}
    </ChakraProvider>
  );
}

export default MyApp;
