
import WordleStack from './WordleStack'
import * as sst from '@serverless-stack/resources'

export default function main(app: sst.App): void {

  app.setDefaultFunctionProps({
    runtime: 'nodejs14.x'
  })

  new WordleStack(app, 'wordle-stack')
}
