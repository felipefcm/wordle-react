import { NextApiRequest, NextApiResponse } from 'next'
import { AttemptResult } from '@common/MatchState'
import LetterState from '@common/LetterState'

const dailyWordHandler = async (req: NextApiRequest, res: NextApiResponse<AttemptResult[] | { error: string }>) => {

	const attempt = req.body.attempt as string
	const testWord = req.body.testWord as string

	const word = testWord || 'APPLE'

	if (!attempt || attempt.length !== 5) {
		res.status(400).json({ error: 'Invalid attempt' })
		return
	}

	const attemptResult = getAttemptResult(word, attempt)

	res.json(attemptResult)
}

export default dailyWordHandler