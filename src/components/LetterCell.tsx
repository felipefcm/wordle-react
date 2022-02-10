import React from 'react'

import { Center, useTheme } from '@chakra-ui/react'
import { determineColors, State } from '../lib/wordle'

type Props = {
  letter?: string
  state: State
}

const LetterCell: React.FC<Props> = (props) => {
  const { colors } = useTheme()
  
  const [bgColor, textColor] = determineColors(props.state, colors)

	return (
    <Center
      width={10}
      height={10}
      rounded={6}
      fontSize={30}
      bg={bgColor}
      color={textColor}
    >
      {(props.letter || ' ').toUpperCase()}
    </Center>
  )
}

export default LetterCell
