import { EventBus, EventType } from '@common/EventBus'
import API from './API'

class Network {

	private api: API
	private eventBus: EventBus

	private subscriptionIds: Record<string, number> = {}

	constructor(api: API, eventBus: EventBus) {
		this.api = api
		this.eventBus = eventBus
	}

	up() {
		const attemptMadeId = this.eventBus.subscribe(
			EventType.ATTEMPT_MADE,
			async (attempt: string) => {
				const result = await this.api.submitAttempt(attempt)
				this.eventBus.publish(EventType.ATTEMPT_RESULT, result)
			}
		)

		this.subscriptionIds[EventType.ATTEMPT_MADE] = attemptMadeId
	}

	down() {
		for (const eventName in this.subscriptionIds) {
			const id = this.subscriptionIds[eventName]
			this.eventBus.unsubscribe(eventName as EventType, id)
		}
	}
}

export default Network
