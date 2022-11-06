import "@fontsource/changa";
import "@/styles/quill.css";

import { ChakraProvider, createLocalStorageManager } from "@chakra-ui/react";
import { ReactElement, ReactNode, useState } from "react";

import type { AppProps } from "next/app";
import NextNProgress from "@/components/NextNProgress";
import { NextPage } from "next";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
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
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <ChakraProvider theme={theme} colorModeManager={manager}>
        <NextNProgress />
        {getLayout(<Component {...pageProps} />)}
      </ChakraProvider>
    </SessionContextProvider>
  );
}

export default MyApp;
