
import { APIResponse } from '@common/APITypes'
import axios from 'axios'

class API {

	private client = axios.create()

	async submitAttempt(attempt: string) {
		const { data: response } = await this.client.post<APIResponse>('/api/daily/attempt', {
			attempt
		})

		return response
	}

	async getSolution() {
		const { data: response } = await this.client.get<APIResponse>('/api/daily/solution')
		return response
	}
}

export default API
