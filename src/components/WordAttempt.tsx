import React from 'react'

import { HStack } from '@chakra-ui/react'

import LetterCell from './LetterCell'
import { determineLetterState, State } from '../lib/wordle'

type Props = {
  isCurrent: boolean
  word: string
  attempt: string
}

const WordAttempt: React.FC<Props> = (props) => {

  const renderLetters = () => {
    return [...Array(props.word.length)].map((_, i) => (
      <LetterCell 
        key={i}
        letter={props.attempt[i] || ''}
        state={determineLetterState(props.word, props.attempt, i)}
      />
    ))
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
