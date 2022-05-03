
import { EventBus, EventType } from '@common/EventBus'
import { Dispatch } from 'react'
import API from './API'
import { APIAction, APIActionType } from '@client/APIStateHook'
import { AttemptResult } from '@common/MatchState'

class Network {

	private api: API
	private eventBus: EventBus

	private subscriptionIds: Record<string, number> = {}

	private apiStateDispatch: Dispatch<APIAction>

	constructor(api: API, eventBus: EventBus, apiStateDispatch: Dispatch<APIAction>) {
		this.api = api
		this.eventBus = eventBus
		this.apiStateDispatch = apiStateDispatch
	}

	up() {
		const attemptMadeId = this.eventBus.subscribe(
			EventType.ATTEMPT_MADE,
			async (attempt: string) => {
				this.apiStateDispatch({ type: APIActionType.SetLoading })

				const response = await this.api.submitAttempt(attempt)

				if (response.data) {
					const result = response.data as AttemptResult[]

					this.apiStateDispatch({ type: APIActionType.SetData, data: result })
					this.eventBus.publish(EventType.ATTEMPT_RESULT, result)
				}
				else if (response.error) {
					const error = response.error
					this.apiStateDispatch({ type: APIActionType.SetError, error })
				}
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
