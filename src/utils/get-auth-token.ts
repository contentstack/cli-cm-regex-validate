import * as Configstore from 'configstore'
const config = new Configstore('contentstack_cli')
const regexMessages = require('../../messages/index.json').validateRegex

export default async function getAuthToken() {
  const authToken = await config.get('authtoken')
  if (!authToken) {
    throw new Error(regexMessages.errors.login)
  }
  return authToken
}
