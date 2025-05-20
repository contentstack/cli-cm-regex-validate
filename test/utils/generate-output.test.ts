import * as path from 'path'
import * as fs from 'fs'
import generateOutput from '../../src/utils/generate-output'
const invalidJsonOutput = require('../data/invalidRegex.json')
const invalidTableOutput = require('../data/tableData.json')
const regexMessages = require('../../messages/index.json').validateRegex

jest.mock('fs')
jest.mock('@contentstack/cli-utilities', () => ({
  cliux: {
    print: jest.fn(),
  },
  sanitizePath: (path: string) => path,
}))

describe('Generate Output after Stack is Processed', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  test('Filepath Flag is not set & Invalid Regex is found', async () => {
    const consoleSpy = jest.spyOn(console, 'log')
    await generateOutput({}, invalidJsonOutput, invalidTableOutput)
    expect(consoleSpy).toHaveBeenCalledTimes(1)
    expect(consoleSpy).toHaveBeenCalledWith(regexMessages.output.tableOutput)
  })

  test('Filepath Flag is set, Path already exists & Invalid Regex is found', async () => {
    const flags = {
      filePath: '/path/to/output/directory/',
    }
    const consoleSpy = jest.spyOn(console, 'log')
    jest.spyOn(path, 'resolve')
    jest.spyOn(fs, 'existsSync').mockImplementationOnce(() => {
      return true
    })
    await generateOutput(flags, invalidJsonOutput, invalidTableOutput)
    expect(path.resolve).toBeCalled()
    expect(fs.existsSync).toBeCalled()
    expect(fs.writeFileSync).toBeCalled()
    expect(consoleSpy).toHaveBeenCalledTimes(1)
    expect(consoleSpy).toHaveBeenCalledWith(regexMessages.output.tableOutput)
  })

  test('Filepath Flag is set, Path does not exists & Invalid Regex is found', async () => {
    const flags = {
      filePath: '/path/to/output/directory/',
    }
    const consoleSpy = jest.spyOn(console, 'log')
    jest.spyOn(path, 'resolve')
    jest.spyOn(fs, 'existsSync').mockImplementationOnce(() => {
      return false
    })
    await generateOutput(flags, invalidJsonOutput, invalidTableOutput)
    expect(path.resolve).toBeCalled()
    expect(fs.existsSync).toBeCalled()
    expect(fs.mkdirSync).toBeCalled()
    expect(fs.writeFileSync).toBeCalled()
    expect(consoleSpy).toHaveBeenCalledTimes(1)
    expect(consoleSpy).toHaveBeenCalledWith(regexMessages.output.tableOutput)
  })

  test('File is getting saved', async () => {
    const consoleSpy = jest.spyOn(console, 'log')
    await generateOutput({}, invalidJsonOutput, invalidTableOutput)
    expect(consoleSpy).toHaveBeenCalledTimes(1)
    expect(consoleSpy).toHaveBeenCalledWith(regexMessages.output.tableOutput)
    expect(fs.writeFileSync).toBeCalled()
  })

  test('Invalid Regex is not found', async () => {
    const consoleSpy = jest.spyOn(console, 'log')
    await generateOutput({}, [], [])
    expect(consoleSpy).toHaveBeenCalledTimes(0)
  })
})
