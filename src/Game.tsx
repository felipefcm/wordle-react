import React, { FC } from 'react'

import { Box, Center, Flex, useTheme } from '@chakra-ui/react'

import MainBoard from './components/MainBoard'
import VirtualKeyboard from './components/VirtualKeyboard'

const words = [
  'apple',
  // 'robot',
  // 'house',
  // 'stoic',
]

const Game: FC = () => {
  const { colors } = useTheme()

  const randomWord = words[Math.trunc(Math.random() * words.length)]

  return (
    <Flex direction="column">
      <Center h="10" bg={colors.brand.titleBarBg} color={colors.brand.titleBarText}>
        Wordle Game
      </Center>

      <Box>
        <MainBoard word={randomWord} numAttempts={5} />
      </Box>

      <Box>
        <VirtualKeyboard word={randomWord} />
      </Box>
    </Flex>
  )
}

export default Game
