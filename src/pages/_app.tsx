import '../styles/globals.css';
import type { AppProps } from 'next/app';
import '../utils/firebase/init';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
