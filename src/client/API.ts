
import axios from 'axios'

const client = axios.create()

const submitAttempt = async (attempt: string) => {
	const { data } = await client.post('/api/daily', {
		attempt
	})

	return data
}

const getSolution = async () => {

}

const API = {
	submitAttempt,
	getSolution,
}

export default API
