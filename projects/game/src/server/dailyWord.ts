
import { getItem, putItem, scanTable } from '@server/db'

import random from 'random-seed'
import cache from 'node-cache'

const dailyWordCache = new cache({
	checkperiod: 0
})

export const getDailyWord = async (day: number) => {

	const cached = dailyWordCache.get(day)
	if (cached) return cached as string

	const entry = await getItem<{ word: string }>('daily', { day })

	if (entry) {
		dailyWordCache.set(day, entry.word)
		return entry.word
	}

	const newWord = await createDailyWord(day)
	dailyWordCache.set(day, newWord)

	return newWord
}

export const getDayNumber = (date: Date) => {
	return parseInt(`${date.getFullYear()}${date.getMonth()}${date.getDate()}`)
}

const createDailyWord = async (day: number) => {
	const letters = 'abcdefghijklmnopqrstuvwxyz'

	const generator = random.create(`daily-${day}`)

	let randomLetters = ''
	for (let i = 0; i < 5; ++i) {
		const randomIndex = Math.trunc(generator.random() * letters.length)
		randomLetters = randomLetters + letters[randomIndex]
	}

	let word = ''
	while (!word) {
		const scan = await scanTable<{ word: string }>('words', {
			limit: 1,
			exclusiveStartKey: { word: randomLetters }
		})

		if (scan.items && scan.items.length > 0)
			word = scan.items[0].word
	}

	await putItem('daily', {
		day,
		word,
	})

	return word
}
