import { Box, HStack } from '@chakra-ui/react'
import React from 'react'

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
          <Box bg={"blue.300"}>
            {letter}
          </Box>
        ))
      }
    </HStack>
  )
}

const VirtualKeyboard: React.FC<Props> = (props) => {

	return (
    <>
      {renderRow(rows[0])}
    </>
  )
}

export default VirtualKeyboard
