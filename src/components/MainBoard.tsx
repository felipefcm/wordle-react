import React from 'react'

import { Box, HStack, useTheme, VStack } from '@chakra-ui/react'
import LetterCell, { State } from './LetterCell'
import WordAttempt from './WordAttempt'

type Props = {
	wordLength: number
	numAttempts: number
}

const MainBoard: React.FC<Props> = (props) => {
	return (
    <Box>
      <VStack spacing="2px" pt={2} pb={2}>
        <WordAttempt />
        <WordAttempt />
      </VStack>
    </Box>
  )
}

export default MainBoard
