import "@fontsource/changa";
import "@/styles/global.css";
import "@/styles/transitions.css";

import { ChakraProvider, createLocalStorageManager, useDisclosure } from "@chakra-ui/react";
import { ReactElement, ReactNode, useEffect, useState } from "react";

import type { AppProps } from "next/app";
import { GoogleAnalytics } from "nextjs-google-analytics";
import NextNProgress from "@/components/NextNProgress";
import { NextPage } from "next";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import theme from "theme";
import LocationProvider from "@/components/LocationProvider";
import Head from "next/head";
import favicon from "public/favicon.ico";
import bglogo from "public/bglogo.png";
import { supabase } from "@/utils/supabaseClient";
import ResetPassword from "@/components/ResetPassword";

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

  const resetPasswordModal = useDisclosure();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == "PASSWORD_RECOVERY") {
        resetPasswordModal.onOpen();
      }
    });
  }, [resetPasswordModal]);

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}>
      <ChakraProvider theme={theme} colorModeManager={manager}>
        <Head>
          <link rel='shortcut icon' href={favicon.src} />
          <meta property='og:image' content={bglogo.src} />
        </Head>

        <GoogleAnalytics trackPageViews={{ ignoreHashChange: true }} />
        <NextNProgress />
        <LocationProvider />
        {getLayout(<Component {...pageProps} />)}
        <ResetPassword modal={resetPasswordModal} />
      </ChakraProvider>
    </SessionContextProvider>
  );
}

export default MyApp;
