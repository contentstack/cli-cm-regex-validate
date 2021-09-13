import * as path from 'path'
import * as fs from 'fs'
import generateOutput from '../../src/utils/output'
const invalidJsonOutput = require('../data/invalidRegex.json')
const invalidTableOutput = require('../data/tableData.json')
const regexMessages = require('../../messages/index.json').validateRegex

jest.mock('fs')

describe('Generate Output after Stack is Processed', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  test('Filepath Flag is not set & Invalid Regex is found', async () => {
    const resultFile = 'results.csv'
    const storagePath = path.resolve(__dirname, '../../', resultFile)
    const consoleSpy = jest.spyOn(console, 'log')
    await generateOutput({}, invalidJsonOutput, invalidTableOutput)
    expect(consoleSpy).toHaveBeenCalledTimes(4)
    expect(consoleSpy).toHaveBeenCalledWith(regexMessages.tableOutput)
    expect(consoleSpy).toHaveBeenCalledWith(regexMessages.csvOutput, storagePath)
    expect(consoleSpy).toHaveBeenCalledWith(regexMessages.docsLink)
  })

  test('Filepath Flag is set, Path already exists & Invalid Regex is found', async () => {
    const flags = {
      filePath: '/path/to/output/directory/',
    }
    const resultFile = 'results.csv'
    const storagePath = flags.filePath + resultFile
    const consoleSpy = jest.spyOn(console, 'log')
    jest.spyOn(path, 'resolve')
    jest.spyOn(fs, 'existsSync').mockImplementationOnce(() => {
      return true
    })
    await generateOutput(flags, invalidJsonOutput, invalidTableOutput)
    expect(path.resolve).toBeCalled()
    expect(fs.existsSync).toBeCalled()
    expect(fs.writeFileSync).toBeCalled()
    expect(consoleSpy).toHaveBeenCalledTimes(4)
    expect(consoleSpy).toHaveBeenCalledWith(regexMessages.tableOutput)
    expect(consoleSpy).toHaveBeenCalledWith(regexMessages.csvOutput, storagePath)
    expect(consoleSpy).toHaveBeenCalledWith(regexMessages.docsLink)
  })

  test('Filepath Flag is set, Path does not exists & Invalid Regex is found', async () => {
    const flags = {
      filePath: '/path/to/output/directory/',
    }
    const resultFile = 'results.csv'
    const storagePath = flags.filePath + resultFile
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
    expect(consoleSpy).toHaveBeenCalledTimes(4)
    expect(consoleSpy).toHaveBeenCalledWith(regexMessages.tableOutput)
    expect(consoleSpy).toHaveBeenCalledWith(regexMessages.csvOutput, storagePath)
    expect(consoleSpy).toHaveBeenCalledWith(regexMessages.docsLink)
  })

  test('File is getting saved', async () => {
    const resultFile = 'results.csv'
    const storagePath = path.resolve(__dirname, '../../', resultFile)
    const consoleSpy = jest.spyOn(console, 'log')
    await generateOutput({}, invalidJsonOutput, invalidTableOutput)
    expect(consoleSpy).toHaveBeenCalledTimes(4)
    expect(consoleSpy).toHaveBeenCalledWith(regexMessages.tableOutput)
    expect(consoleSpy).toHaveBeenCalledWith(regexMessages.csvOutput, storagePath)
    expect(consoleSpy).toHaveBeenCalledWith(regexMessages.docsLink)
    const originalFs = jest.requireActual('fs')
    expect(originalFs.existsSync(storagePath)).toBeTruthy()
  })

  test('Invalid Regex is not found', async () => {
    const consoleSpy = jest.spyOn(console, 'log')
    await generateOutput({}, [], [])
    expect(consoleSpy).toHaveBeenCalledTimes(1)
    expect(consoleSpy).toHaveBeenCalledWith(regexMessages.noInvalidRegex)
  })
})
