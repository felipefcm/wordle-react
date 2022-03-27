import LetterState from "./LetterState"

export type AttemptResult = [string, LetterState]

class MatchState {

	private attemptsState: Record<number, AttemptResult[]> = {}
	private keyboardLettersState: Record<string, LetterState> = {}

	reset() {
		this.attemptsState = {}
		this.keyboardLettersState = {}
	}

	getLetterState(attemptIndex: number, letterIndex: number) {
		const attemptState = this.attemptsState[attemptIndex]
		if (!attemptState) return LetterState.UNKNOWN

		const letterState = attemptState[letterIndex][1]

		return letterState || LetterState.UNKNOWN
	}

	getKeyboardLetterState(letter: string) {
		return this.keyboardLettersState[letter.toUpperCase()] || LetterState.UNKNOWN
	}

	parseResult(attemptIndex: number, results: AttemptResult[]) {
		this.attemptsState[attemptIndex] = results
		this.updateKeyboardLetterState()
	}

	private updateKeyboardLetterState() {

		for (const attemptState in this.attemptsState) {
			for (const letterState of this.attemptsState[attemptState]) {

				const [letter, state] = letterState
				const currentState = this.keyboardLettersState[letter]

				if (state === LetterState.CORRECT) {
					this.keyboardLettersState[letter] = LetterState.CORRECT
					continue
				}

				if (state === LetterState.INCORRECT_POSITION && currentState !== LetterState.CORRECT) {
					this.keyboardLettersState[letter] = LetterState.INCORRECT_POSITION
					continue
				}

				if (state === LetterState.NOT_PRESENT && (!currentState || currentState === LetterState.UNKNOWN)) {
					this.keyboardLettersState[letter] = LetterState.NOT_PRESENT
					continue
				}
			}
		}
	}
}

export default MatchState
