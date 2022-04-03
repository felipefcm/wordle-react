import * as sst from '@serverless-stack/resources'

import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'

export default class WordleStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props)

    new dynamodb.Table(this, 'words', {
      partitionKey: {
        name: 'words',
        type: dynamodb.AttributeType.STRING
      }
    })
  }
}
