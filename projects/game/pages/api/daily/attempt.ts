
import { NextApiRequest, NextApiResponse } from 'next'

import { getAttemptResult, wordIsValid } from '@server/wordle'
import { APIResponse } from '@common/APITypes'
import { getDailyWord, getDayNumber } from '@server/dailyWord'

const dailyWordAttemptHandler = async (req: NextApiRequest, res: NextApiResponse<APIResponse>) => {
	const attempt = req.body.attempt as string

	const isValid = await wordIsValid(attempt)
	if (!isValid) {
		res.json({ error: { code: 'InvalidWord' } })
		return
	}

	const dayNum = getDayNumber(new Date())
	const word = await getDailyWord(dayNum)

	if (!attempt || attempt.length !== 5) {
		res.status(400).json({ error: { code: 'InvalidAttempt' } })
		return
	}

	const attemptResult = getAttemptResult(word, attempt)

	res.json({ data: attemptResult })
}

export default dailyWordAttemptHandler