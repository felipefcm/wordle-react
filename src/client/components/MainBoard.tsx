import React, { useContext, useEffect, useState } from 'react'

import { Box, VStack } from '@chakra-ui/react'
import WordAttempt from './WordAttempt'
import { GameContext } from '@client/GameContext'
import { EventType } from '@common/EventBus'
import API from '@client/API'

const WORD_LENGTH = 5

type Props = {
  numAttempts: number
}

const MainBoard: React.FC<Props> = (props) => {

  const gameContext = useContext(GameContext)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (gameContext) {
      const id = gameContext.eventBus.subscribe(EventType.ATTEMPT, async (attempt: string) => {
        const result = await API.submitAttempt(attempt)
        gameContext.matchState.parseResult(result)



        setCurrent(current + 1)

        if (current >= props.numAttempts - 1)
          gameContext.eventBus.publish(EventType.GAME_OVER)
      })

      return () => {
        gameContext.eventBus.unsubscribe(EventType.ATTEMPT, id)
      }
    }
  })

  const renderAttemps = () => {
    return (
      <VStack spacing="2px" pt={2} pb={2}>
        {
          [...Array(props.numAttempts)].map((_, i) => (
            <WordAttempt
              key={i}
              isCurrent={i === current}
              wordLength={WORD_LENGTH}
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
