import React from 'react'
import ReactDOM from 'react-dom'

import { ChakraProvider } from '@chakra-ui/react'

import theme from './theme'
import Game from './Game'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Game />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// reportWebVitals(console.log)
