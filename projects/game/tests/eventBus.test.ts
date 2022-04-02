import { EventBus, EventType } from "@common/EventBus"

let eventBus: EventBus

describe('EventBus', () => {

	beforeEach(() => {
		eventBus = new EventBus()
	})

	test('should deliver published event', () => {
		const callback = jest.fn()
		eventBus.subscribe(EventType.KEYPRESS, callback)

		eventBus.publish(EventType.KEYPRESS, 'value')
		expect(callback).toHaveBeenCalledTimes(1)
		expect(callback).toBeCalledWith('value')

		eventBus.publish(EventType.KEYPRESS, 'value2')
		expect(callback).toHaveBeenCalledTimes(2)
		expect(callback).nthCalledWith(2, 'value2')
	})

	test('should stop delivering events if unsubscribed', () => {
		const callback = jest.fn()

		const id = eventBus.subscribe(EventType.KEYPRESS, callback)
		eventBus.unsubscribe(EventType.KEYPRESS, id)

		eventBus.publish(EventType.KEYPRESS, 'value')

		expect(callback).not.toHaveBeenCalled()
	})
})
