import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>트위터 클론코딩 by YG1ee</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
