import React, { useContext, useEffect, useState } from 'react'

import { HStack } from '@chakra-ui/react'

import LetterCell from './LetterCell'
import { determineLetterState, State } from '../lib/wordle'
import { GameContext } from '../lib/GameContext'
import { EventType } from '../lib/EventBus'

type Props = {
  isCurrent: boolean
  word: string
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
            if (attempt.length === props.word.length)
              gameContext.eventBus.publish(EventType.ATTEMPT, attempt)
            break

          default:
            if (attempt.length <= props.word.length)
              setAttempt(attempt + letter)
        }
      })

      return () => {
        gameContext.eventBus.unsubscribe(EventType.KEYPRESS, id)
      }
    }
  })

  const renderLetters = () => {
    return [...Array(props.word.length)].map((_, i) => {

      const letterState = props.isCurrent ?
        State.NOT_PRESENT : determineLetterState(props.word, attempt, i)

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
