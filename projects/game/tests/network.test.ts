
import API from "@client/API"
import Network from "@client/Network"
import { EventBus, EventType } from "@common/EventBus"
import LetterState from "@common/LetterState"
import { AttemptResult } from "@common/MatchState"

jest.mock('@client/API')

let api = new API()
let eventBus: EventBus
let network: Network

describe('Network', () => {

	beforeEach(() => {
		jest.clearAllMocks()
		eventBus = new EventBus()

		network = new Network(api, eventBus, () => { })
		network.up()
	})

	test('should submit attempt when ATTEMP_MADE event occurs', async () => {
		jest.spyOn(api, 'submitAttempt').mockResolvedValueOnce({ data: [] })
		eventBus.publish(EventType.ATTEMPT_MADE, 'BINGO')
		expect(api.submitAttempt).toHaveBeenCalledTimes(1)
	})

	test('an ATTEMPT_MADE event should eventually produce an ATTEMPT_RESULT', (done) => {
		const result: AttemptResult[] = [
			['B', LetterState.CORRECT],
			['L', LetterState.INCORRECT_POSITION],
			['I', LetterState.NOT_PRESENT],
			['N', LetterState.NOT_PRESENT],
			['G', LetterState.INCORRECT_POSITION],
		]

		jest.spyOn(api, 'submitAttempt').mockResolvedValueOnce({ data: result })

		const callback = jest.fn((res: AttemptResult[]) => {
			expect(res).toStrictEqual(result)
			done()
		})

		eventBus.subscribe(EventType.ATTEMPT_RESULT, callback)
		eventBus.publish(EventType.ATTEMPT_MADE, 'BLING')
	})
})