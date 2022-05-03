import React, { useContext, useEffect, useRef, useState } from 'react'

import { HStack } from '@chakra-ui/react'

import LetterCell from './LetterCell'
import { GameContext } from '@client/GameContext'
import { EventType } from '@common/EventBus'
import LetterState from '@common/LetterState'

type Props = {
  isCurrent: boolean
  wordLength: number
  attemptIndex: number
}

const WordAttempt: React.FC<Props> = (props) => {

  const gameContext = useContext(GameContext)
  const [attempt, setAttempt] = useState('')

  const processKeypress = useRef(true)

  useEffect(() => {
    if (gameContext) {
      const keypressId = gameContext.eventBus.subscribe(EventType.KEYPRESS, (letter: string) => {

        if (!processKeypress.current) return
        if (!props.isCurrent) return

        switch (letter) {
          case 'BACKSPACE':
            setAttempt(attempt.slice(0, -1))
            break

          case 'ENTER':
            if (attempt.length === props.wordLength)
              gameContext.eventBus.publish(EventType.ATTEMPT_MADE, attempt)
            break

          default:
            if (attempt.length < props.wordLength)
              setAttempt(attempt + letter)
        }
      })

      const gameOverId = gameContext.eventBus.subscribe(EventType.GAME_OVER, () => {
        processKeypress.current = false
      })

      return () => {
        gameContext.eventBus.unsubscribe(EventType.KEYPRESS, keypressId)
        gameContext.eventBus.unsubscribe(EventType.GAME_OVER, gameOverId)
      }
    }
  })

  const renderLetters = () => {
    return [...Array(props.wordLength)].map((_, i) => {

      let letterState = LetterState.UNKNOWN

      if (!props.isCurrent && attempt[i] && gameContext)
        letterState = gameContext.matchState.getLetterState(props.attemptIndex, i)

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
