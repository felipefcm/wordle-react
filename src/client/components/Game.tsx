import React, { FC, useEffect } from 'react'

import { Box, Center, Flex, useTheme } from '@chakra-ui/react'

import MainBoard from './MainBoard'
import VirtualKeyboard from './VirtualKeyboard'
import { GameContext, GameContextType } from '@client/GameContext'
import { EventBus, EventType } from '../../common/EventBus'

const gameContext: GameContextType = {
  eventBus: new EventBus(),
}

const words = [
  'apple',
  // 'robot',
  // 'house',
  // 'stoic',
]

const Game: FC = () => {

  const randomWord = words[Math.trunc(Math.random() * words.length)]

  useEffect(() => {
    const id = gameContext.eventBus.subscribe(EventType.ATTEMPT, (attempt: string) => {
    })

    return () => {
      gameContext.eventBus.unsubscribe(EventType.ATTEMPT, id)
    }
  })

  return (
    <GameContext.Provider value={gameContext}>
      <Flex direction="column">
        <TitleBar />
        <MainBoard word={randomWord} numAttempts={6} />
        <VirtualKeyboard word={randomWord} />
      </Flex>
    </GameContext.Provider>
  )
}

const TitleBar = () => {
  const { colors } = useTheme()

  return (
    <Center h="10" bg={colors.brand.titleBarBg} color={colors.brand.titleBarText}>
      Wordle Game
    </Center>
  )
}

export default Game
