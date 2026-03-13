import inquirer from 'inquirer'
import {inquireAlias, inquireModule, validateAlias, validateModule} from '../../src/utils/interactive'
const regexMessages = require('../../messages/index.json').validateRegex

describe('Interactive', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  test('Alias Token Flag is Set', async () => {
    const flags = {alias: 'Test Token'}
    const response = await inquireAlias(flags)
    expect(response).toBeUndefined()
  })

  test('Alias Token is not Entered', async () => {
    const alias = ''
    const response = await validateAlias(alias)
    expect(response).toBe(regexMessages.interactive.required)
  })

  test('Alias Token is Entered', async () => {
    const alias = 'Test Token'
    const flags = {}
    const response = await validateAlias(alias)
    expect(response).toBe(true);
    (jest.spyOn(inquirer, 'prompt') as jest.Mock).mockImplementation(() =>
      Promise.resolve({alias: alias}),
    )
    await inquireAlias(flags)
  })

  test('Module Flags are Set', async () => {
    async function testModuleFlags(flags: object) {
      const response = await inquireModule(flags)
      expect(response).toBeUndefined()
    }

    testModuleFlags({contentType: true})
    testModuleFlags({globalField: true})
    testModuleFlags({contentType: true, globalField: true})
  })

  test('Module is not Selected', async () => {
    const choice: string[] = []
    const response = await validateModule(choice)
    expect(response).toBe(regexMessages.interactive.selectOne)
  })

  test('Content Type Module is Selected', async () => {
    const choice: string[] = ['contentType']
    const response = await validateModule(choice)
    expect(response).toBe(true);
    (jest.spyOn(inquirer, 'prompt') as jest.Mock).mockImplementation(() =>
      Promise.resolve({choice: choice}),
    )
    await inquireModule(choice)
  })

  test('Global Field Module is Selected', async () => {
    const choice: string[] = ['globalField']
    const response = await validateModule(choice)
    expect(response).toBe(true);
    (jest.spyOn(inquirer, 'prompt') as jest.Mock).mockImplementation(() =>
      Promise.resolve({choice: choice}),
    )
    await inquireModule(choice)
  })

  test('Both Modules are Selected', async () => {
    const choice: string[] = ['contentType', 'globalField']
    const response = await validateModule(choice)
    expect(response).toBe(true);
    (jest.spyOn(inquirer, 'prompt') as jest.Mock).mockImplementation(() =>
      Promise.resolve({choice: choice}),
    )
    await inquireModule(choice)
  })
})
