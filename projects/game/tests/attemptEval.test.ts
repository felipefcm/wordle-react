
import { getAttemptResult } from '@server/wordle'
import LetterState from '@common/LetterState'

describe('Attempt evaluation', () => {
	it('should return all letters as CORRECT', async () => {
		const result = getAttemptResult('BLING', 'BLING')
		expect(result).toStrictEqual([
			['B', LetterState.CORRECT],
			['L', LetterState.CORRECT],
			['I', LetterState.CORRECT],
			['N', LetterState.CORRECT],
			['G', LetterState.CORRECT],
		])
	})

	it('should return all letters as NOT_PRESENT', async () => {
		const result = getAttemptResult('QWERT', 'BLING')
		expect(result).toStrictEqual([
			['B', LetterState.NOT_PRESENT],
			['L', LetterState.NOT_PRESENT],
			['I', LetterState.NOT_PRESENT],
			['N', LetterState.NOT_PRESENT],
			['G', LetterState.NOT_PRESENT],
		])
	})

	it('should return all letters as INCORRECT_POSITION', async () => {
		const result = getAttemptResult('APPLE', 'EALPP')
		expect(result).toStrictEqual([
			['E', LetterState.INCORRECT_POSITION],
			['A', LetterState.INCORRECT_POSITION],
			['L', LetterState.INCORRECT_POSITION],
			['P', LetterState.INCORRECT_POSITION],
			['P', LetterState.INCORRECT_POSITION],
		])
	})

	it('should return all letters with correct evaluation', async () => {
		const result = getAttemptResult('BLING', 'BILNT')
		expect(result).toStrictEqual([
			['B', LetterState.CORRECT],
			['I', LetterState.INCORRECT_POSITION],
			['L', LetterState.INCORRECT_POSITION],
			['N', LetterState.CORRECT],
			['T', LetterState.NOT_PRESENT],
		])
	})

	it('should handle duplicates correctly', async () => {
		const result = getAttemptResult('BLING', 'BBANG')
		expect(result).toStrictEqual([
			['B', LetterState.CORRECT],
			['B', LetterState.NOT_PRESENT],
			['A', LetterState.NOT_PRESENT],
			['N', LetterState.CORRECT],
			['G', LetterState.CORRECT],
		])
	})

	it('should handle duplicates correctly (2)', async () => {
		const result = getAttemptResult('APPLE', 'PPACX')
		expect(result).toStrictEqual([
			['P', LetterState.INCORRECT_POSITION],
			['P', LetterState.CORRECT],
			['A', LetterState.INCORRECT_POSITION],
			['C', LetterState.NOT_PRESENT],
			['X', LetterState.NOT_PRESENT],
		])
	})

	it('should handle duplicates correctly (3)', async () => {
		const result = getAttemptResult('APPLE', 'BSAPP')
		expect(result).toStrictEqual([
			['B', LetterState.NOT_PRESENT],
			['S', LetterState.NOT_PRESENT],
			['A', LetterState.INCORRECT_POSITION],
			['P', LetterState.INCORRECT_POSITION],
			['P', LetterState.INCORRECT_POSITION],
		])
	})

	it('should handle duplicates correctly (4)', async () => {
		const result = getAttemptResult('APPLE', 'BPPRS')
		expect(result).toStrictEqual([
			['B', LetterState.NOT_PRESENT],
			['P', LetterState.CORRECT],
			['P', LetterState.CORRECT],
			['R', LetterState.NOT_PRESENT],
			['S', LetterState.NOT_PRESENT],
		])
	})
})
