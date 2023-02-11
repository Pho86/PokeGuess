import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { Inter } from '@next/font/google'
import Head from 'next/head';


const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <meta name="description" content="Hello world." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>

    <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>

    <Component {...pageProps} />

  </>

}
