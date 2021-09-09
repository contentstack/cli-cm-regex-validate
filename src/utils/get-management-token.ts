import {Command} from '@contentstack/cli-command'
const regexMessages = require('../../messages/index.json').validateRegex

export default async function getManagementToken(alias: any) {
  const command = new Command()
  try {
    return await command.getToken(alias)
  } catch (error) {
    throw new Error(regexMessages.errors.tokenNotFound)
  }
}
