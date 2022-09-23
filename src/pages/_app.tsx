import "../styles/globals.css";
import type { AppProps } from "next/app";
import "../lib/firebase/init";
import { MantineProvider } from "@mantine/core";
import { AuthProvider } from "src/context/auth";

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
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </MantineProvider>
  );
}

export default MyApp;
