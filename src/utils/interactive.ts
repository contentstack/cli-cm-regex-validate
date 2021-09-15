import * as inquirer from 'inquirer'
const regexMessages = require('../../messages/index.json').validateRegex

export const validateAlias = async function (alias: any) {
  if (!alias || alias.trim() === '') {
    return regexMessages.interactive.required
  }
  return true
}

export async function inquireAlias(flags: any) {
  if (!flags.alias || flags.alias.trim() === '') {
    const input = [{
      type: 'input',
      name: 'alias',
      message: regexMessages.interactive.requireToken,
      validate: validateAlias,
    }]
    const response = await inquirer.prompt(input)
    flags.alias = response.alias
    return flags
  }
}

export const validateModule = async function (choice: any) {
  if (choice.length === 0) {
    return regexMessages.interactive.selectOne
  }
  return true
}

export async function inquireModule(flags: any) {
  if (!flags.contentType && !flags.globalField) {
    const choices = [{
      type: 'checkbox',
      name: 'choice',
      message: regexMessages.interactive.selectSchema,
      choices: [
        {name: 'Content Type', value: 'contentType', checked: true},
        {name: 'Global Field', value: 'globalField'},
      ],
      validate: validateModule,
    }]
    const response = await inquirer.prompt(choices)
    response.choice.forEach((ch: any) => {
      flags[ch] = true
    })
    return flags
  }
}
