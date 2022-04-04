
import { NextApiRequest, NextApiResponse } from 'next'

import { AttemptResult } from '@common/MatchState'
import { getAttemptResult } from '@server/wordle'
import { wordIsValid } from '@server/db'

const dailyWordHandler = async (req: NextApiRequest, res: NextApiResponse<AttemptResult[] | { error: string }>) => {
	const attempt = req.body.attempt as string

	const isValid = await wordIsValid(attempt)
	if (!isValid) {
		res.json({ error: 'InvalidWord' })
		return
	}

	const word = 'APPLE'

	if (!attempt || attempt.length !== 5) {
		res.status(400).json({ error: 'InvalidAttempt' })
		return
	}

	const attemptResult = getAttemptResult(word, attempt)

	res.json(attemptResult)
}

export default dailyWordHandler