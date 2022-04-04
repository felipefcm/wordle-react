
import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand, QueryCommand } from '@aws-sdk/lib-dynamodb'

const docClient = DynamoDBDocumentClient.from(new DynamoDB({}))

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
