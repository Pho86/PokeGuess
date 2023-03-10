import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { Figtree } from '@next/font/google'
import Head from 'next/head';

import { LazyMotion, domAnimation } from 'framer-motion';
import NextProgress from "next-progress";

const figtree = Figtree({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <meta name="description" content="Who's that Pokémon? with PokéGuess." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/logo.svg" />
    </Head>

    <style jsx global>{`
        html, button, ::placeholder, input {
          font-family: ${figtree.style.fontFamily};
        }
        
      `}</style>
      
    <NextProgress delay={300} options={{ showSpinner: false }} color="#67b6ff"/>

    <LazyMotion features={domAnimation}>
      <Component {...pageProps} />
    </LazyMotion>

  </>

}
