import React, { useContext, useEffect, useState } from 'react'

import { Box, VStack } from '@chakra-ui/react'
import WordAttempt from './WordAttempt'
import { GameContext } from '@client/GameContext'
import { EventType } from '@common/EventBus'

type Props = {
  word: string
  numAttempts: number
}

const MainBoard: React.FC<Props> = (props) => {

  const gameContext = useContext(GameContext)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (gameContext) {
      const id = gameContext.eventBus.subscribe(EventType.ATTEMPT, (attempt: string) => {
        if (current < props.numAttempts - 1)
          setCurrent(current + 1)
        else
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
              word={props.word}
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
