import * as contentstackSdk from '@contentstack/management'
import {cli} from 'cli-ux'
import processStack from './process-stack'
const regexMessages = require('../../messages/index.json').validateRegex

export default async function connectStack(flags: any, authToken: string, apiKey: string) {
  try {
    const startTime = Date.now()
    cli.action.start(regexMessages.cliAction.connectStackStart, '', {stdout: true})
    const client = contentstackSdk.client({
      authtoken: authToken,
    })
    await client.stack({api_key: apiKey}).fetch().then(async (stack: any) => {
      await processStack(flags, stack, startTime)
    })
  } catch (error) {
    throw new Error(regexMessages.errors.stack.apiKey)
  }
}
