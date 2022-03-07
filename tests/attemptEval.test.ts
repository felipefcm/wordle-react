
import { getAttemptResult } from '../src/server/wordle'
import LetterState from '../src/common/LetterState'

describe('Attempt evaluation', () => {
	it('should return all letters as CORRECT', async () => {
		const allCorrect = getAttemptResult('BLING', 'BLING')
		expect(allCorrect).toStrictEqual([
			['B', LetterState.CORRECT],
			['L', LetterState.CORRECT],
			['I', LetterState.CORRECT],
			['N', LetterState.CORRECT],
			['G', LetterState.CORRECT],
		])
	})

	it('should return all letters as NOT_PRESENT', async () => {
		const allCorrect = getAttemptResult('QWERT', 'BLING')
		expect(allCorrect).toStrictEqual([
			['B', LetterState.NOT_PRESENT],
			['L', LetterState.NOT_PRESENT],
			['I', LetterState.NOT_PRESENT],
			['N', LetterState.NOT_PRESENT],
			['G', LetterState.NOT_PRESENT],
		])
	})

	it('should return all letters as INCORRECT_POSITION', async () => {
		const allCorrect = getAttemptResult('APPLE', 'EALPP')
		expect(allCorrect).toStrictEqual([
			['E', LetterState.INCORRECT_POSITION],
			['A', LetterState.INCORRECT_POSITION],
			['L', LetterState.INCORRECT_POSITION],
			['P', LetterState.INCORRECT_POSITION],
			['P', LetterState.INCORRECT_POSITION],
		])
	})

	it('should return all letters with correct evaluation', async () => {
		const allCorrect = getAttemptResult('BLING', 'BILNT')
		expect(allCorrect).toStrictEqual([
			['B', LetterState.CORRECT],
			['I', LetterState.INCORRECT_POSITION],
			['L', LetterState.INCORRECT_POSITION],
			['N', LetterState.CORRECT],
			['T', LetterState.NOT_PRESENT],
		])
	})
})
