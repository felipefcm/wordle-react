
import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb'
import remoteCredentials from './aws-credentials'

const docClient = DynamoDBDocumentClient.from(new DynamoDB({ credentials: remoteCredentials }))

export const wordIsValid = async (word: string) => {
	const result = await docClient.send(
		new GetCommand({
			TableName: 'words',
			Key: {
				word: word.toLowerCase()
			}
		})
	)

	return result.Item !== undefined
}
