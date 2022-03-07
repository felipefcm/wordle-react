import React from 'react'

import { Center, useTheme } from '@chakra-ui/react'
import { determineColors } from '../../common/wordle'
import { LetterState } from '../../common/MatchState'

type Props = {
  letter?: string
  state: LetterState
}

const LetterCell: React.FC<Props> = (props) => {
  const { colors } = useTheme()

  const [bgColor, textColor] = determineColors(props.state, colors)

  return (
    <Center
      width={10}
      height={10}
      rounded={1}
      fontSize={30}
      bg={bgColor}
      color={textColor}
    >
      {(props.letter || ' ').toUpperCase()}
    </Center>
  )
}

export default LetterCell
