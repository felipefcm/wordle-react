
import { APIResponse } from '@common/APITypes'
import axios from 'axios'

class API {

	private client = axios.create()

	async submitAttempt(attempt: string) {
		const { data: response } = await this.client.post<APIResponse>('/api/daily', {
			attempt
		})

		return response
	}

	async getSolution() {
	}
}

export default API
