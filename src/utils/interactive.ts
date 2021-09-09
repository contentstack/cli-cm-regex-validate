import * as inquirer from 'inquirer'

export async function inquireAlias(flags: any, regexMessages: any) {
  if (!flags.alias || flags.alias.trim() === '') {
    const input = [{
      type: 'input',
      name: 'alias',
      message: regexMessages.requireToken,
      validate: function (alias: any) {
        if (!alias || alias.trim() === '') {
          return regexMessages.required
        }
        return true
      },
    }]
    await inquirer.prompt(input).then(input => {
      flags.alias = input.alias
    })
  }
}

export async function inquireModule(flags: any, regexMessages: any) {
  if (!flags.contentType && !flags.globalField) {
    const choices = [{
      type: 'checkbox',
      name: 'choice',
      message: regexMessages.selectSchema,
      choices: [
        {name: 'Content Type', value: 'contentType', checked: true},
        {name: 'Global Field', value: 'globalField'},
      ],
      validate: function (choice: any) {
        if (choice.length === 0) {
          return regexMessages.selectOne
        }
        return true
      },
    }]
    await inquirer.prompt(choices).then(choices => {
      choices.choice.forEach((ch: any) => {
        flags[ch] = true
      })
    })
  }
}
