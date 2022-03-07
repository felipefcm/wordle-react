import LetterState from "@common/LetterState"

export const determineColors = (state: LetterState, colors: any) => {
	switch (state) {
		case LetterState.UNKNOWN:
			return [colors.brand.letterUnknownBg, colors.brand.letterUnknownText]
		case LetterState.NOT_PRESENT:
			return [colors.brand.letterNotInWordBg, colors.brand.letterNotInWordText]
		case LetterState.INCORRECT_POSITION:
			return [colors.brand.letterIncorrectPosBg, colors.brand.letterIncorrectPosText]
		case LetterState.CORRECT:
			return [colors.brand.letterCorrectBg, colors.brand.letterCorrectText]
	}
}