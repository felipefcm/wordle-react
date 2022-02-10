
export enum State {
	NOT_PRESENT,
	INCORRECT_POSITION,
	CORRECT,
}

export const determineLetterState = (word: string, attempt: string, attemptIndex: number) => {
  const wordIndex = word.indexOf(attempt[attemptIndex])
  
  if(word[attemptIndex] === attempt[attemptIndex]) return State.CORRECT
  if(wordIndex >= 0) return State.INCORRECT_POSITION
  
  return State.NOT_PRESENT
}

export const determineColors = (state: State, colors: any) => {
	switch (state) {
		case State.NOT_PRESENT:
		return [colors.brand.letterNotInWordBg, colors.brand.letterNotInWordText]
		case State.INCORRECT_POSITION:
		return [colors.brand.letterIncorrectPosBg, colors.brand.letterIncorrectPosText]
		case State.CORRECT:
		return [colors.brand.letterCorrectBg, colors.brand.letterCorrectText]
	}
}