import {Command} from '@contentstack/cli-command'
import getManagementToken from '../../src/utils/get-management-token'
const regexMessages = require('../../messages/index.json').validateRegex

describe('Get Management Token Details using Alias Name', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  test('Valid Token Alias is Entered', async () => {
    const alias = 'Random Token'
    const token =  {
      token: 'management_token_value',
      apiKey: 'api_key_value',
      type: 'management',
    }
    jest.spyOn(Command.prototype, 'getToken').mockImplementation(() => {
      return token
    })
    const tokenDetails = await getManagementToken(alias)
    expect(tokenDetails).toStrictEqual(token)
  })

  test('Invalid Token Alias is Entered', async () => {
    try {
      const alias = 'Regex Check'
      jest.spyOn(Command.prototype, 'getToken').mockImplementation(() => {
        throw new Error(regexMessages.errors.tokenNotFound)
      })
      await getManagementToken(alias)
    } catch (error) {
      expect(error.message).toBe(regexMessages.errors.tokenNotFound)
    }
  })
})
