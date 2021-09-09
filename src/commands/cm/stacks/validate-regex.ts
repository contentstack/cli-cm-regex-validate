import {Command, flags} from '@oclif/command'

export default class CmStacksValidateRegex extends Command {
  static description = 'This command is used to check for Invalid Regex in all the Content Types & Global Fields'

  static flags = {
    help: flags.help({char: 'h'}),
    alias: flags.string({char: 'a', description: 'Alias to the token for referring it with other commands.'}),
    contentType: flags.boolean({char: 'c', description: 'Add to check Invalid Regex for Content Types'}),
    globalField: flags.boolean({char: 'g', description: 'Add to check Invalid Regex for Global Fields'}),
    filePath: flags.string({char: 'f', description: 'Mention the path where the Output File will be stored'}),
  }

  static usage = 'cm:stacks:validate-regex --alias=[ALIAS_NAME] --contentType --globalField --filePath=[FILE_PATH]'

  static examples = [
    '$ csdx cm:stacks:validate-regex',
    '$ csdx cm:stacks:validate-regex --alias=\'Alias Name\' -a \'Alias Name\'',
    '$ csdx cm:stacks:validate-regex --contentType -c',
    '$ csdx cm:stacks:validate-regex --globalField -g',
    '$ csdx cm:stacks:validate-regex --filePath=\'path/to/the/directory/\' -f \'path/to/the/directory/\'',
    '$ csdx cm:stacks:validate-regex --alias=\'Alias Name\' --contentType --globalField',
    '$ csdx cm:stacks:validate-regex --alias=\'Alias Name\' --contentType --globalField --filePath=\'path/to/the/directory/\'',
    '$ csdx cm:stacks:validate-regex -a \'Alias Name\' -c -g',
    '$ csdx cm:stacks:validate-regex -a \'Alias Name\' -c -g -f \'path/to/the/directory/\'',
    '$ csdx cm:stacks:validate-regex -cga \'Alias Name\'',
    '$ csdx cm:stacks:validate-regex -cga \'Alias Name\' -f \'path/to/the/directory/\'',
  ]

  async run() {
    const {args, flags} = this.parse(CmStacksValidateRegex)

    this.log('Validate Regex Command')
  }
}
