
import LetterState from '@common/LetterState'
import { AttemptResult } from '@common/MatchState'
import { getItem } from '@server/db'
import { removeChatAt } from '@common/util'

export const getAttemptResult = (word: string, attempt: string) => {
	if (word.length !== attempt.length) throw new Error('Invalid attempt')

	word = word.toUpperCase()
	attempt = attempt.toUpperCase()

	let availableLetters = word

	const attemptResult = attempt.split('').map((letter, i) => {

		let letterState = LetterState.NOT_PRESENT

		if (word[i] === letter) {
			letterState = LetterState.CORRECT
			availableLetters = removeChatAt(availableLetters, i)
		}
		else {
			const wordIndex = availableLetters.indexOf(letter)
			if (wordIndex < 0) {
				letterState = LetterState.NOT_PRESENT
			}
			else {
				availableLetters = removeChatAt(availableLetters, wordIndex)
				letterState = LetterState.INCORRECT_POSITION
			}
		}

		const result: AttemptResult = [
			letter,
			letterState
		]

		return result
	})

	return attemptResult
}

export const wordIsValid = async (word: string) => {
	const result = await getItem('words', { word: word.toLowerCase() })
	return result !== undefined
}
