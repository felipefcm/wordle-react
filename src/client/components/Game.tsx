import React, { FC, useEffect, useState } from 'react'

import { Center, Flex, Text, useTheme } from '@chakra-ui/react'

import MainBoard from './MainBoard'
import VirtualKeyboard from './VirtualKeyboard'
import { GameContext, GameContextType } from '@client/GameContext'
import { EventBus, EventType } from '@common/EventBus'
import MatchState from '@common/MatchState'
import Network from '@client/Network'
import API from '@client/API'

const isDev = process.env.NODE_ENV === 'development'

const gameContext: GameContextType = {
  eventBus: new EventBus(isDev),
  matchState: new MatchState(),
}

const Game: FC = () => {

  const [api] = useState(new API())
  const [network] = useState(new Network(api, gameContext.eventBus))
  const [message, setMessage] = useState('')

  useEffect(() => {
    network.up()

    const id = gameContext.eventBus.subscribe(EventType.GAME_OVER, async (won: boolean) => {
      setMessage(won ? 'You found the word, congrats!' : 'Loooooser! Better luck (or brains) next time.')
    })

    return () => {
      gameContext.eventBus.unsubscribe(EventType.GAME_OVER, id)
      network.down()
    }
  })

  return (
    <GameContext.Provider value={gameContext}>
      <Flex direction="column">
        <TitleBar />
        <MainBoard numAttempts={6} />
        <Center>
          <Text color="gray.100">{message}</Text>
        </Center>
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
