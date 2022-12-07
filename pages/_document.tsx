import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

import { ColorModeScript } from "@chakra-ui/react";
import theme from "theme";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html dir={theme.direction} lang="ar">
        <Head>

        </Head>
        <body>
          <div id="fb-root"></div>
          <script async defer  crossorigin="anonymous"
          src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v15.0&appId=1079583326132167&autoLogAppEvents=1"
          nonce="lNeZIlkB">
          </script>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} storageKey="talleed-theme-mode" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
