
import { AttemptResult } from '@common/MatchState'
import axios from 'axios'

class API {

	private static client = axios.create()

	static async submitAttempt(attempt: string) {
		const { data } = await this.client.post('/api/daily', {
			attempt
		})

		return data as AttemptResult[]
	}

	static async getSolution() {
	}
}

export default API
