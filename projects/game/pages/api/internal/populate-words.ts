import type { NextApiRequest, NextApiResponse } from 'next'

import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'

import fs from 'fs/promises'
import promiseMap from 'p-map'

const client = new DynamoDB({})
const docClient = DynamoDBDocumentClient.from(client)

type Data = {
  msg: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const wordsBuffer = await fs.readFile('./words/words_5.txt', 'utf-8')
  const wordsSet = new Set(wordsBuffer.split('\n'))

  while (wordsSet.size > 0) {
    const roundWords = Array.from(wordsSet)

    await promiseMap(roundWords, async (word) => {
      try {
        await docClient.send(
          new PutCommand({
            TableName: 'words',
            Item: {
              word
            }
          })
        )

        console.log(`Added '${word}'`)
        wordsSet.delete(word)
      }
      // eslint-disable-next-line no-empty
      catch (err) {
      }
    }, { concurrency: 5 })

    console.log(`Round finished, waiting to restart (${wordsSet.size} words to go)`)
    await new Promise((res) => setTimeout(() => res(0), 5000))
  }

  res.status(200).json({ msg: 'OK' })
}

export default handler
