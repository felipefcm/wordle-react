
import { Dispatch, useReducer } from 'react'
import { APIError } from '@common/APITypes'

export type APIState =
	{ status: 'idle' } |
	{ status: 'loading' } |
	{ status: 'success', data?: unknown } |
	{ status: 'error', error?: APIError }

export enum APIActionType {
	SetLoading,
	SetData,
	SetError,
}

export type APIAction =
	{ type: APIActionType.SetLoading } |
	{ type: APIActionType.SetData, data: unknown } |
	{ type: APIActionType.SetError, error: APIError }

export const useAPIState = (): [APIState, Dispatch<APIAction>] => {

	const [apiState, dispatch] = useReducer((prevState: APIState, action: APIAction): APIState => {
		switch (action.type) {
			case APIActionType.SetLoading: {
				return { status: 'loading' }
			}
			case APIActionType.SetData: {
				return { status: 'success', data: action.data }
			}
			case APIActionType.SetError: {
				return { status: 'error', error: action.error }
			}
		}
	}, { status: 'idle' })

	return [apiState, dispatch]
}
