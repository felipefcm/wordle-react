
import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb'
import remoteCredentials from './aws-credentials'

const docClient = DynamoDBDocumentClient.from(new DynamoDB({ credentials: remoteCredentials }))

export type Key = {
	[key: string]: string | number
}

export const getItem = async <T>(table: string, key: Key) => {
	const result = await docClient.send(
		new GetCommand({
			TableName: table,
			Key: key
		})
	)

	return result.Item as T
}

export type ScanTableParams = {
	limit?: number
	exclusiveStartKey?: Key
}

export type ScanTableResult<T> = {
	items?: T[]
	lastEvaluatedKey?: Key
}

export const scanTable = async <T>(table: string, params: ScanTableParams) => {
	const random = await docClient.send(
		new ScanCommand({
			TableName: table,
			Limit: params.limit,
			ExclusiveStartKey: params.exclusiveStartKey,
		})
	)

	return {
		items: random.Items as T[],
		lastEvaluatedKey: random.LastEvaluatedKey,
	} as ScanTableResult<T>
}

export const putItem = async (table: string, item: unknown) => {
	await docClient.send(
		new PutCommand({
			TableName: table,
			Item: item as { [key: string]: unknown }
		})
	)
}
