
import { getItem, scanTable } from '@server/db'

export const getDailyWord = async (day: number) => {
	const entry = await getItem<{ word: string }>('daily', { day })

	if (entry)
		return entry.word

	return createDailyWord(day)
}

const createDailyWord = async (day: number) => {
	const letters = 'abcdefghijklmnopqrstuvwxyz'

	let randomLetters = ''
	for (let i = 0; i < 5; ++i) {
		const randomIndex = Math.trunc(Math.random() * letters.length)
		randomLetters = randomLetters + letters[randomIndex]
	}

	const items = await scanTable('words', {
		limit: 1,
		exclusiveStartKey: { word: randomLetters }
	})

	return ''
}
