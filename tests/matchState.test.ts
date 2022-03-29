
import MatchState from '@common/MatchState'
import LetterState from '@common/LetterState'

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

	test('parseResult should not allow parsing same attempt index more than once', () => {
		matchState.parseResult(0, [
			['A', LetterState.CORRECT]
		])

		expect(() => {
			matchState.parseResult(0, [
				['A', LetterState.CORRECT]
			])
		}).toThrow()
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

	test('getKeyboardLetterState: should return correct state', () => {
		matchState.parseResult(0, [
			['A', LetterState.CORRECT],
			['B', LetterState.INCORRECT_POSITION],
			['C', LetterState.UNKNOWN],
			['D', LetterState.NOT_PRESENT],
		])

		expect(matchState.getKeyboardLetterState('A')).toBe(LetterState.CORRECT)
		expect(matchState.getKeyboardLetterState('B')).toBe(LetterState.INCORRECT_POSITION)
		expect(matchState.getKeyboardLetterState('C')).toBe(LetterState.UNKNOWN)
		expect(matchState.getKeyboardLetterState('D')).toBe(LetterState.NOT_PRESENT)

		matchState.parseResult(1, [
			['B', LetterState.CORRECT],
			['C', LetterState.INCORRECT_POSITION]
		])

		expect(matchState.getKeyboardLetterState('B')).toBe(LetterState.CORRECT)
		expect(matchState.getKeyboardLetterState('C')).toBe(LetterState.INCORRECT_POSITION)

		matchState.parseResult(2, [
			['A', LetterState.INCORRECT_POSITION],
			['B', LetterState.INCORRECT_POSITION],
		])

		expect(matchState.getKeyboardLetterState('A')).toBe(LetterState.CORRECT)
		expect(matchState.getKeyboardLetterState('B')).toBe(LetterState.CORRECT)
	})
})
