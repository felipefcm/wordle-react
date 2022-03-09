import React, { FC, useEffect } from 'react'

import { Center, Flex, useTheme } from '@chakra-ui/react'

import MainBoard from './MainBoard'
import VirtualKeyboard from './VirtualKeyboard'
import { GameContext, GameContextType } from '@client/GameContext'
import { EventBus, EventType } from '../../common/EventBus'
import MatchState from '@common/MatchState'

const gameContext: GameContextType = {
  eventBus: new EventBus(),
  matchState: new MatchState(),
}

const Game: FC = () => {

  useEffect(() => {
    const id = gameContext.eventBus.subscribe(EventType.GAME_OVER, async () => {

    })

    return () => {
      gameContext.eventBus.unsubscribe(EventType.GAME_OVER, id)
    }
  })

  return (
    <GameContext.Provider value={gameContext}>
      <Flex direction="column">
        <TitleBar />
        <MainBoard numAttempts={6} />
        <VirtualKeyboard />
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
