import { extendTheme, ThemeOverride } from "@chakra-ui/react"

const theme = {
  colors: {
    brand: {
      background: 'gray.900',

      titleBarBg: 'blue.800',
      titleBarText: 'gray.200',

      letterNotInWordBg: 'gray.700',
      letterNotInWordText: 'gray.300',
      letterIncorrectPosBg: 'orange.500',
      letterIncorrectPosText: 'gray.700',
      letterCorrectBg: 'green.500',
      letterCorrectText: 'gray.300',
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
