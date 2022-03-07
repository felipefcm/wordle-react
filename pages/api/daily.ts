import { NextApiRequest, NextApiResponse } from 'next'
import { AttemptResult, LetterState } from '../../src/common/MatchState'

export const determineLetterState = (word: string, attempt: string, attemptIndex: number) => {
	const wordIndex = word.indexOf(attempt[attemptIndex])

	if (word[attemptIndex] === attempt[attemptIndex]) return LetterState.CORRECT
	if (wordIndex >= 0) return LetterState.INCORRECT_POSITION

	return LetterState.NOT_PRESENT
}

const dailyWordHandler = async (req: NextApiRequest, res: NextApiResponse<AttemptResult[] | { error: string }>) => {

	const attempt = String(req.body.attempt)

	if (!attempt || attempt.length !== 5) {
		res.status(400).json({ error: 'Invalid attempt' })
		return
	}

	const attemptResult = attempt.split('').map((letter, i) => {
		const result: AttemptResult = [
			letter.toUpperCase(),
			determineLetterState('APPLE', attempt, i)
		]

		return result
	})

	res.json(attemptResult)
}

export default dailyWordHandler