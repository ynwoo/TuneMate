import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content="#e4ddff" />
        <link rel="manifest" href="/manifest.json" />
        <link
          href="image/icon-48x48.png"
          rel="icon"
          type="image/png"
          sizes="48x48"
        />
        <link
          href="image/icon-96x96.png"
          rel="icon"
          type="image/png"
          sizes="96x96"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
