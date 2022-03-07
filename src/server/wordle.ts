
import LetterState from "@common/LetterState"
import { AttemptResult } from "@common/MatchState"

export const determineLetterState = (word: string, attempt: string, attemptIndex: number) => {
	const wordIndex = word.indexOf(attempt[attemptIndex])

	if (word[attemptIndex] === attempt[attemptIndex]) return LetterState.CORRECT
	if (wordIndex >= 0) return LetterState.INCORRECT_POSITION

	return LetterState.NOT_PRESENT
}

export const getAttemptResult = (word: string, attempt: string) => {
	if (word.length !== attempt.length) throw new Error('Invalid attempt')

	const attemptResult = attempt.split('').map((letter, i) => {
		const result: AttemptResult = [
			letter.toUpperCase(),
			determineLetterState(word, attempt, i)
		]

		return result
	})

	return attemptResult
}