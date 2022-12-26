import "@fontsource/changa";
import "@/styles/global.css";
import "@/styles/transitions.css";

import { ChakraProvider, createLocalStorageManager } from "@chakra-ui/react";
import { ReactElement, ReactNode, useState } from "react";

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
            </ChakraProvider>
        </SessionContextProvider>
    );
}

export default MyApp;
