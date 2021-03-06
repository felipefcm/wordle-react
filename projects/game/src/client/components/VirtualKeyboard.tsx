import React, { useContext, useEffect, useState } from 'react'

import { Center, Flex, HStack, useTheme, VStack } from '@chakra-ui/react'
import { BsBackspace } from 'react-icons/bs'
import { GameContext } from '@client/GameContext'
import { EventType } from '@common/EventBus'
import { determineColors } from '@client/LetterColors'
import LetterState from '@common/LetterState'

const rows = [
  'qwertyuiop',
  'asdfghjkl',
  'zxcvbnm',
]

const VirtualKeyboard: React.FC = () => {

  const { colors } = useTheme()
  const gameContext = useContext(GameContext)
  const [attemptsMade, setAttemptsMade] = useState(0)

  const onKeyPress = (letter: string) => {
    if (gameContext) {
      gameContext.eventBus.publish(EventType.KEYPRESS, letter)
    }
  }

  useEffect(() => {
    if (gameContext) {
      const id = gameContext.eventBus.subscribe(
        EventType.ATTEMPT_RESULT,
        () => {
          // re-render when a new result becomes available
          setAttemptsMade(attemptsMade + 1)
        }
      )

      return () => {
        gameContext.eventBus.unsubscribe(EventType.ATTEMPT_RESULT, id)
      }
    }
  })

  const renderRow = (row: string) => {
    return (
      <HStack spacing={1}>
        {
          row.split('').map((letter, i) => {
            const keyboardLetterState = gameContext?.matchState.getKeyboardLetterState(letter)
            const color = determineColors(keyboardLetterState || LetterState.UNKNOWN, colors)

            return (
              <Center
                as={'button'}
                key={i}
                color={'gray.200'}
                bg={color[0]}
                cursor={'default'}
                width={8}
                height={10}
                rounded={1}
                onClick={() => onKeyPress(letter.toUpperCase())}
              >
                {letter.toUpperCase()}
              </Center>
            )
          })
        }
      </HStack>
    )
  }

  const Backspace = () => {
    const { colors } = useTheme()
    return (
      <Center
        as={'button'}
        bg={colors.brand.backspaceBg}
        color={colors.brand.backspaceText}
        width={10}
        height={10}
        rounded={1}
        onClick={() => onKeyPress('BACKSPACE')}
      >
        <BsBackspace />
      </Center>
    )
  }

  const Enter = () => {
    const { colors } = useTheme()
    return (
      <Center
        as={'button'}
        cursor={'default'}
        bg={colors.brand.enterBg}
        color={colors.brand.enterText}
        width={20}
        height={10}
        rounded={1}
        onClick={() => onKeyPress('ENTER')}
      >
        {'ENTER'}
      </Center>
    )
  }

  return (
    <Flex justifyContent="center">
      <VStack mt={10} spacing={1}>

        {renderRow(rows[0])}
        {renderRow(rows[1])}
        {renderRow(rows[2])}

        <HStack spacing={1}>
          <Backspace />
          <Enter />
        </HStack>
      </VStack>
    </Flex>
  )
}

export default VirtualKeyboard
