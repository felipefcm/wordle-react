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
}

export default MatchState
