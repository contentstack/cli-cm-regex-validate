import * as contentstackSdk from '@contentstack/management'
import connectStack from '../../src/utils/connect-stack'
import {cli} from 'cli-ux'
import processStack from '../../src/utils/process-stack'
const regexMessages = require('../../messages/index.json').validateRegex

jest.mock('@contentstack/management', () => ({client: jest.fn()}))
jest.mock('../../src/utils/generate-output.ts')
jest.mock('../../src/utils/process-stack.ts')

/* @ts-ignore */
cli = ({
  debug: jest.fn(),
  error: jest.fn(),
  action: {
    start: jest.fn(),
    stop: jest.fn(),
  }})

describe('Get Client from Management SDK, connect with Stack & process Stack', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  test('API Key is Valid', async () => {
    const apiKey = 'blt1234'
    const authToken = 'blt1234'
    const flags = {
      contentType: true,
      globalField: true,
    }
    contentstackSdk.client.mockImplementation(() => {
      return {
        stack: jest.fn().mockImplementation(() => {
          return {
            fetch: jest.fn().mockResolvedValue(Promise.resolve({stack: {}})),
          }
        }),
      }
    })
    await connectStack(flags, authToken, apiKey)
    expect(cli.action.start).toHaveBeenCalled()
    expect(processStack).toHaveBeenCalled()
  })

  test('API Key is Invalid', async () => {
    try {
      const apiKey = 'blt1234'
      const authToken = 'blt1234'
      const flags = {
        contentType: true,
        globalField: true,
      }
      contentstackSdk.client.mockImplementation(() => {
        return {
          stack: jest.fn().mockImplementation(() => {
            return {
              fetch: jest.fn().mockRejectedValue(Promise.resolve(Error)),
            }
          }),
        }
      })
      await connectStack(flags, authToken, apiKey)
      expect(cli.action.start).toHaveBeenCalled()
    } catch (error) {
      expect(error.message).toBe(regexMessages.errors.stack.apiKey)
    }
  })
})
