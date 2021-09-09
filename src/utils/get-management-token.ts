import {Command} from '@contentstack/cli-command'
const regexMessages = require('../../messages/index.json').validateRegex

export default async function getManagementToken(alias: any) {
  const command = new Command()
  // let tokenDetails: any
  try {
    // const tokenDetails = command.getToken('Regex Check')
    // tokenDetails = await command.getToken(alias)
    // console.log(`${regexMessages.tokenDetails}${JSON.stringify(tokenDetails)}`)
    // return tokenDetails
    return await command.getToken(alias)
  } catch (error) {
    // console.error(regexMessages.errors.tokenNotFound)
    throw new Error(regexMessages.errors.tokenNotFound)
  }
}
