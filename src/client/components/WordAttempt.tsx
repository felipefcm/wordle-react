import React, { useContext, useEffect, useState } from 'react'

import { HStack } from '@chakra-ui/react'

import LetterCell from './LetterCell'
import { GameContext } from '@client/GameContext'
import { EventType } from '@common/EventBus'
import LetterState from '@common/LetterState'

type Props = {
  isCurrent: boolean
  wordLength: number
}

const WordAttempt: React.FC<Props> = (props) => {

  const gameContext = useContext(GameContext)
  const [attempt, setAttempt] = useState('')

  useEffect(() => {
    if (gameContext) {
      const id = gameContext.eventBus.subscribe(EventType.KEYPRESS, (letter: string) => {
        if (!props.isCurrent) return

        switch (letter) {
          case 'BACKSPACE':
            setAttempt(attempt.slice(0, -1))
            break

          case 'ENTER':
            if (attempt.length === props.wordLength)
              gameContext.eventBus.publish(EventType.ATTEMPT, attempt)
            break

          default:
            if (attempt.length < props.wordLength)
              setAttempt(attempt + letter)
        }
      })

      return () => {
        gameContext.eventBus.unsubscribe(EventType.KEYPRESS, id)
      }
    }
  })

  const renderLetters = () => {
    return [...Array(props.wordLength)].map((_, i) => {

      let letterState = LetterState.NOT_PRESENT

      if (!props.isCurrent && attempt[i] && gameContext)
        letterState = gameContext.matchState.getLetterState(attempt[i])

      return (
        <LetterCell
          key={i}
          letter={attempt[i]}
          state={letterState}
        />
      )
    })
  }

  return (
    <>
      <HStack spacing="2px">
        {renderLetters()}
      </HStack>
    </>
  )
}

export default WordAttempt
