
import { NextApiRequest, NextApiResponse } from 'next'

import { getAttemptResult } from '@server/wordle'
import { wordIsValid } from '@server/db'
import { APIResponse } from '@common/APITypes'

const dailyWordHandler = async (req: NextApiRequest, res: NextApiResponse<APIResponse>) => {
	const attempt = req.body.attempt as string

	const isValid = await wordIsValid(attempt)
	if (!isValid) {
		res.json({ error: { code: 'InvalidWord' } })
		return
	}

	const word = 'APPLE'

	if (!attempt || attempt.length !== 5) {
		res.status(400).json({ error: { code: 'InvalidAttempt' } })
		return
	}

	const attemptResult = getAttemptResult(word, attempt)

	res.json({ data: attemptResult })
}

export default dailyWordHandler