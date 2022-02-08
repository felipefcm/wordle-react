import React from 'react'

import { HStack } from '@chakra-ui/react'

import LetterCell, { State } from './LetterCell'

type Props = {
}

const WordAttempt: React.FC<Props> = (props) => {
  return (
    <>
      <HStack spacing="2px">
        <LetterCell letter='S' state={State.NOT_PRESENT} />
        <LetterCell letter='T' state={State.INCORRECT_POSITION} />
        <LetterCell letter='U' state={State.CORRECT} />
      </HStack>
    </>
  )
}

export default WordAttempt
