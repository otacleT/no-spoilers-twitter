import "../styles/globals.css";
import type { AppProps } from "next/app";
import "../utils/firebase/init";
import { MantineProvider } from "@mantine/core";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      theme={{
        colorScheme: "dark",
        colors: {
          twitterColor: [
            "#1d9bf0",
            "#1d9bf0",
            "#1d9bf0",
            "#1d9bf0",
            "#1d9bf0",
            "#1d9bf0",
            "#1d9bf0",
            "#1d9bf0",
            "#1d9bf0",
            "#1d9bf0",
          ],
        },
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Component {...pageProps} />
    </MantineProvider>
  );
}

export default MyApp;
