import * as sst from '@serverless-stack/resources'

import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'

export default class WordleStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props)

    new dynamodb.Table(this, 'words', {
      tableName: 'words',
      readCapacity: 1,
      writeCapacity: 1,
      partitionKey: {
        name: 'word',
        type: dynamodb.AttributeType.STRING
      },
    })

    new dynamodb.Table(this, 'daily', {
      tableName: 'daily',
      readCapacity: 1,
      writeCapacity: 1,
      partitionKey: {
        name: 'day',
        type: dynamodb.AttributeType.NUMBER
      }
    })
  }
}
