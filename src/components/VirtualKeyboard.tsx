import React, { useContext } from 'react'

import { Center, HStack, useTheme, VStack } from '@chakra-ui/react'
import { BsBackspace } from 'react-icons/bs'
import { determineLetterState } from '../lib/wordle'
import { GameContext } from '../lib/GameContext'

type Props = {
  word: string
}

const rows = [
  'qwertyuiop',
  'asdfghjkl',
  'zxcvbnm',
]

const VirtualKeyboard: React.FC<Props> = (props) => {

  const gameContext = useContext(GameContext)

  const onKeyPress = (letter: string) => {
    if (gameContext)
      gameContext.eventBus.publish('keypress', letter)
  }

  const renderRow = (row: string) => {
    return (
      <HStack>
        {
          row.split('').map((letter, i) => (
            <Center
              key={i}
              color={"gray.200"}
              bg={"blue.300"}
              cursor={'default'}
              width={10}
              height={10}
              rounded={4}
              onClick={() => onKeyPress(letter.toUpperCase())}
            >
              {letter.toUpperCase()}
            </Center>
          ))
        }
      </HStack>
    )
  }

  return (
    <VStack mt={10}>

      {renderRow(rows[0])}
      {renderRow(rows[1])}
      {renderRow(rows[2])}

      <HStack>
        <Backspace />
        <Enter />
      </HStack>
    </VStack>
  )
}

const Backspace = () => {
  const { colors } = useTheme()
  return (
    <Center
      bg={colors.brand.backspaceBg}
      color={colors.brand.backspaceText}
      width={10}
      height={10}
      rounded={4}
    >
      <BsBackspace />
    </Center>
  )
}

const Enter = () => {
  const { colors } = useTheme()

  return (
    <Center
      cursor={'default'}
      bg={colors.brand.enterBg}
      color={colors.brand.enterText}
      width={20}
      height={10}
      rounded={4}
    >
      {'ENTER'}
    </Center>
  )
}

export default VirtualKeyboard
