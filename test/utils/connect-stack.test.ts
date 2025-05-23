import * as contentstackSdk from '@contentstack/management'
import connectStack from '../../src/utils/connect-stack'
import {cli} from 'cli-ux'
import processStack from '../../src/utils/process-stack'

// Mock the entire module
jest.mock('@contentstack/management')
jest.mock('../../src/utils/generate-output.ts')
jest.mock('../../src/utils/process-stack.ts')

/* @ts-ignore */
cli = {
  debug: jest.fn(),
  error: jest.fn(),
  action: {
    start: jest.fn(),
    stop: jest.fn(),
  },
}

describe('Get Client from Management SDK, connect with Stack & process Stack', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  test('Token details are Valid', async () => {
    const host = 'api-contentstack.io'
    const tokenDetails = {
      apiKey: 'blt1234',
      token: 'blt1234',
    }
    const flags = {
      contentType: true,
      globalField: true,
    }

    // Mock the client function
    const mockStack = jest.fn().mockResolvedValue({stack: {}})
    const mockClient = {stack: mockStack};
    (contentstackSdk.client as jest.Mock).mockReturnValue(mockClient)

    await connectStack(flags, host, tokenDetails)
    expect(cli.action.start).toHaveBeenCalled()
    expect(processStack).toHaveBeenCalled()
  })

  test('Token details is Invalid', async () => {
    const host = 'api-contentstack.io'
    const tokenDetails = {
      apiKey: 'blt1234',
      token: 'blt1234',
    }
    const flags = {
      contentType: true,
      globalField: true,
    }

    // Mock the client function to reject
    const mockStack = jest.fn().mockImplementation(() => {
      throw new Error('Invalid stack API Key provided.')
    })
    const mockClient = {stack: mockStack};
    (contentstackSdk.client as jest.Mock).mockReturnValue(mockClient)

    await expect(connectStack(flags, host, tokenDetails)).rejects.toEqual(
      expect.any(Error),
    )

    expect(cli.action.start).toHaveBeenCalled()
  })
})
