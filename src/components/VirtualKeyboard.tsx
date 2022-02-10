import React from 'react'

import { Center, HStack, useTheme, VStack } from '@chakra-ui/react'
import { BsBackspace } from 'react-icons/bs'

type Props = {
  word: string
}

const rows = [
  'qwertyuiop',
  'asdfghjkl',
  'zxcvbnm',
]

const renderRow = (row: string) => {
  return (
    <HStack>
      {
        row.split('').map((letter, i) => (
          <Center
            cursor={'default'}
            bg={"blue.300"}
            width={10}
            height={10}
            rounded={4}
          >
            {letter.toUpperCase()}
          </Center>
        ))
      }
    </HStack>
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

const VirtualKeyboard: React.FC<Props> = (props) => {

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

export default VirtualKeyboard
