import getAuthToken from '../../src/utils/get-auth-token'
import * as Configstore from 'configstore'
const regexMessages = require('../../messages/index.json').validateRegex

describe('Authorize User with Auth Token', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  test('User is already Logged in', async () => {
    const authToken = 'blt1234'
    jest.spyOn(Configstore.prototype, 'get').mockImplementation(() => authToken)
    const tokenDetails = await getAuthToken()
    console.log(tokenDetails)
    expect(tokenDetails).toStrictEqual(authToken)
  })

  test('User is not Logged in', async () => {
    try {
      jest.spyOn(Configstore.prototype, 'get').mockImplementation(() => undefined)
      await getAuthToken()
    } catch (error) {
      expect(error.message).toBe(regexMessages.errors.login)
    }
  })
})
