import {cli} from 'cli-ux'
import processStack from '../../src/utils/process-stack'
import generateOutput from '../../src/utils/generate-output'
const validDocument = require('../data/validDocument.json')
const regexMessages = require('../../messages/index.json').validateRegex

jest.mock('../../src/utils/generate-output.ts')

/* @ts-ignore */
cli = ({
  debug: jest.fn(),
  error: jest.fn(),
  action: {
    start: jest.fn(),
    stop: jest.fn(),
  }})

describe('Process Stack', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  test('Process Stack with Content Type & Global Field selected & valid Data', async () => {
    const stack = {
      name: 'stack',
      contentType: jest.fn().mockImplementation(() => {
        return {
          query: jest.fn().mockImplementation(() => {
            return {
              find: jest.fn().mockResolvedValue(Promise.resolve({items: [validDocument]})),
            }
          }),
        }
      }),
      globalField: jest.fn().mockImplementation(() => {
        return {
          query: jest.fn().mockImplementation(() => {
            return {
              find: jest.fn().mockResolvedValue(Promise.resolve({items: [validDocument]})),
            }
          }),
        }
      }),
    }
    const startTime = Date.now()
    await processStack({contentType: true}, stack, startTime)
    await processStack({globalField: true}, stack, startTime)
    expect(cli.action.stop).toHaveBeenCalled()
    expect(cli.action.start).toHaveBeenCalled()
    expect(cli.action.stop).toHaveBeenCalled()
    expect(generateOutput).toHaveBeenCalled()
  })

  test('Process Stack with Content Type selected & invalid Content Type Data', async () => {
    const contentTypeData = {
      title: 'Regex Fields',
      uid: 'regex_fields',
    }
    const stack = {
      name: 'stack',
      contentType: jest.fn().mockImplementation(() => {
        return {
          query: jest.fn().mockImplementation(() => {
            return {
              find: jest.fn().mockResolvedValue(Promise.resolve({items: [contentTypeData]})),
            }
          }),
        }
      }),
    }
    try {
      const startTime = Date.now()
      await processStack({contentType: true}, stack, startTime)
      expect(cli.action.stop).toHaveBeenCalled()
      expect(cli.action.start).toHaveBeenCalled()
      expect(cli.action.stop).toHaveBeenCalled()
      expect(generateOutput).not.toHaveBeenCalled()
    } catch (error) {
      expect(error.message).toBe(regexMessages.errors.stack.contentTypes)
    }
  })

  test('Process Stack with Global Field selected & Invalid Global Field Data', async () => {
    const globalFieldData = {
      title: 'Regex Fields',
      uid: 'regex_fields',
    }
    const stack = {
      name: 'stack',
      globalField: jest.fn().mockImplementation(() => {
        return {
          query: jest.fn().mockImplementation(() => {
            return {
              find: jest.fn().mockResolvedValue(Promise.resolve({items: [globalFieldData]})),
            }
          }),
        }
      }),
    }
    try {
      const startTime = Date.now()
      await processStack({globalField: true}, stack, startTime)
      expect(cli.action.stop).toHaveBeenCalled()
      expect(cli.action.start).toHaveBeenCalled()
      expect(cli.action.stop).toHaveBeenCalled()
      expect(generateOutput).not.toHaveBeenCalled()
    } catch (error) {
      expect(error.message).toBe(regexMessages.errors.stack.globalFields)
    }
  })
})
