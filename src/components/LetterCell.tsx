import React from 'react'

import { Center, useTheme } from '@chakra-ui/react'

export enum State {
  NOT_PRESENT,
  INCORRECT_POSITION,
  CORRECT,
}

type Props = {
  letter: string
  state: State
}

const determineColors = (state: State, colors: any) => {
  switch (state) {
    case State.NOT_PRESENT:
      return [colors.brand.letterNotInWordBg, colors.brand.letterNotInWordText]
    case State.INCORRECT_POSITION:
      return [colors.brand.letterIncorrectPosBg, colors.brand.letterIncorrectPosText]
    case State.CORRECT:
      return [colors.brand.letterCorrectBg, colors.brand.letterCorrectText]
  }
}

const LetterCell: React.FC<Props> = (props) => {
  const { colors } = useTheme()
  
  const cellColors = determineColors(props.state, colors)

	return (
    <Center
      width={10}
      height={10}
      bg={cellColors[0]}
      rounded={6}
      fontSize={30}
      color={cellColors[1]}
    >
      {props.letter}
    </Center>
  )
}

export default LetterCell
