import React, { useState } from 'react'

import { Box, VStack } from '@chakra-ui/react'
import WordAttempt from './WordAttempt'

type Props = {
  word: string
  numAttempts: number
}

const MainBoard: React.FC<Props> = (props) => {

  const [current, setCurrent] = useState(0)
  const [attempts, setAttempts] = useState<string[]>([])

  const renderAttemps = () => {
    return (
      <VStack spacing="2px" pt={2} pb={2}>
        {
          [...Array(props.numAttempts)].map((_, i) => (
            <WordAttempt
              key={i}
              word={props.word}
              attempt={attempts[i] || ''}
              isCurrent={i === current}
            />
          ))
        }
      </VStack>
    )
  }

  return (
    <Box mt={10}>
      {renderAttemps()}
    </Box>
  )
}

export default MainBoard
