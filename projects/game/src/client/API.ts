
import { AttemptResult } from '@common/MatchState'
import axios from "axios"

class API {

	private client = axios.create()

	async submitAttempt(attempt: string) {
		const { data } = await this.client.post('/api/daily', {
			attempt
		})

		return data as AttemptResult[]
	}

	async getSolution() {
	}
}

export default API
