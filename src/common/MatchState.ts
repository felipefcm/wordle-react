import LetterState from "./LetterState"

export type AttemptResult = [string, LetterState]

class MatchState {

	private letterState: Record<string, LetterState> = {}

	getLetterState(letter: string) {
		const state = this.letterState[letter.toUpperCase()]
		return state ? state : LetterState.UNKNOWN
	}

	setLetterState(letter: string, state: LetterState) {
		this.letterState[letter.toUpperCase()] = state
	}

	parseResult(results: [string, string][]) {
		for (const [letter, state] of results) {
			const letterState = LetterState[state as keyof typeof LetterState]
			this.setLetterState(letter, letterState)
		}
	}

	isSolution(attempt: string) {
		return attempt.split('').every(
			letter => this.getLetterState(letter) === LetterState.CORRECT
		)
	}
}

export default MatchState
