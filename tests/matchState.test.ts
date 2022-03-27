
import MatchState from '@common/MatchState'
import LetterState from '../src/common/LetterState'

const matchState = new MatchState()

describe('MatchState', () => {

	beforeEach(() => {
		matchState.reset()
	})

	test('reset works', () => {
		matchState.parseResult(0, [
			['A', LetterState.CORRECT]
		])

		expect(matchState.getLetterState(0, 0)).toBe(LetterState.CORRECT)

		matchState.reset()

		expect(matchState.getLetterState(0, 0)).toBe(LetterState.UNKNOWN)
	})

	test('getLetterState: should return correct state', () => {

		matchState.parseResult(0, [
			['A', LetterState.CORRECT],
			['B', LetterState.INCORRECT_POSITION],
			['C', LetterState.NOT_PRESENT]
		])

		matchState.parseResult(1, [
			['A', LetterState.INCORRECT_POSITION],
			['B', LetterState.NOT_PRESENT],
			['C', LetterState.CORRECT]
		])

		expect(matchState.getLetterState(0, 0)).toBe(LetterState.CORRECT)
		expect(matchState.getLetterState(0, 1)).toBe(LetterState.INCORRECT_POSITION)
		expect(matchState.getLetterState(0, 2)).toBe(LetterState.NOT_PRESENT)

		expect(matchState.getLetterState(1, 0)).toBe(LetterState.INCORRECT_POSITION)
		expect(matchState.getLetterState(1, 1)).toBe(LetterState.NOT_PRESENT)
		expect(matchState.getLetterState(1, 2)).toBe(LetterState.CORRECT)

		expect(matchState.getLetterState(2, 0)).toBe(LetterState.UNKNOWN)
		expect(matchState.getLetterState(3, 6)).toBe(LetterState.UNKNOWN)
	})
})
