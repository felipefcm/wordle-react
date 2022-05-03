
export type APIResponse = {
	data?: unknown
	error?: APIError
}

export type APIError = {
	code: string,
	message?: string
}
