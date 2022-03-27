import React, { useContext, useEffect, useState } from 'react'

import { Box, VStack } from '@chakra-ui/react'
import WordAttempt from './WordAttempt'
import { GameContext } from '@client/GameContext'
import { EventType } from '@common/EventBus'
import { AttemptResult } from '@common/MatchState'

const WORD_LENGTH = 5

type Props = {
  numAttempts: number
}

const MainBoard: React.FC<Props> = (props) => {

  const gameContext = useContext(GameContext)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (gameContext) {
      const id = gameContext.eventBus.subscribe(EventType.ATTEMPT_RESULT, async (result: AttemptResult[]) => {
        gameContext.matchState.parseResult(current, result)

        if (current >= props.numAttempts - 1)
          gameContext.eventBus.publish(EventType.GAME_OVER)

        setCurrent(current + 1)
      })

      return () => {
        gameContext.eventBus.unsubscribe(EventType.ATTEMPT_RESULT, id)
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
              attemptIndex={i}
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
