
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { ChakraProvider } from '@chakra-ui/react'

import theme from '../src/client/theme'

function WordleGameApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Wordle React</title>
      </Head>

      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

export default WordleGameApp
