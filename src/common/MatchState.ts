import LetterState from "./LetterState"

export type AttemptResult = [string, LetterState]

class MatchState {

	private attemptsState: Record<number, AttemptResult[]> = {}

	getLetterState(attemptIndex: number, letterIndex: number) {
		const attemptState = this.attemptsState[attemptIndex]
		if (!attemptState) return LetterState.UNKNOWN

		const letterState = attemptState[letterIndex][1]

		return letterState || LetterState.UNKNOWN
	}

	parseResult(attemptIndex: number, results: AttemptResult[]) {
		this.attemptsState[attemptIndex] = results
	}
}

export default MatchState
