import { Html, Head, Main, NextScript } from "next/document";
import { Toaster } from 'react-hot-toast';

export default function Document() {
 
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
        <title>Wordsworth - Find words worth your time</title>
      </Head>
      <body className="">
          {/* <div className="fixed h-full w-full z-20" id="overlayCanvas"></div> */}
          <Toaster/>
          <Main />
          <NextScript />
      </body>
    </Html>
  );
}
