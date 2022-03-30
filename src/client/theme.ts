
import { extendTheme, ThemeOverride } from '@chakra-ui/react'

const theme = {
  colors: {
    brand: {
      background: 'gray.900',

      titleBarBg: 'blue.800',
      titleBarText: 'gray.200',

      letterUnknownBg: 'gray.700',
      letterUnknownText: 'gray.300',
      letterNotInWordBg: 'gray.800',
      letterNotInWordText: 'gray.300',
      letterIncorrectPosBg: 'orange.500',
      letterIncorrectPosText: 'gray.300',
      letterCorrectBg: 'green.500',
      letterCorrectText: 'gray.300',

      backspaceBg: 'red.500',
      backspaceText: 'gray.300',
      enterBg: 'green.500',
      enterText: 'gray.300',
    }
  },
  styles: {
    global: ({ theme }: ThemeOverride) => ({
      'html, body': {
        backgroundColor: theme.colors.brand.background,
      }
    })
  }
}

export default extendTheme(theme)
