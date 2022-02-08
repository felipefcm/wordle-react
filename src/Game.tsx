import React, { FC } from 'react'

import { Box, Center, Flex, useTheme } from '@chakra-ui/react'

import MainBoard from './components/MainBoard'

const Game: FC = () => {
  const { colors } = useTheme()

  return (
    <Flex direction="column">
      <Center h="10" bg={colors.brand.titleBarBg} color={colors.brand.titleBarText}>
        Wordle Game
      </Center>

      <Box>
        <MainBoard wordLength={4} numAttempts={5} />
      </Box>
    </Flex>
  )
}

export default Game
