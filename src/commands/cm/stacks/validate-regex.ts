import {Command, flags} from '@oclif/command'
import getAuthToken from '../../../utils/get-auth-token'
import {inquireAlias, inquireModule} from '../../../utils/interactive'
import getManagementToken from '../../../utils/get-management-token'
import connectStack from '../../../utils/connect-stack'
const regexMessages = require('../../../../messages/index.json').validateRegex

export default class CmStacksValidateRegex extends Command {
  static description = 'This command is used to find all the invalid regexes present in the content types and global fields of your stack.'

  static flags = {
    help: flags.help({char: 'h'}),
    alias: flags.string({char: 'a', description: 'Alias (name) assigned to the management token'}),
    contentType: flags.boolean({char: 'c', description: 'To find invalid regexes within the content types'}),
    globalField: flags.boolean({char: 'g', description: 'To find invalid regexes within the global fields'}),
    filePath: flags.string({char: 'f', description: 'The path or the location in your file system where the CSV output file should be stored, e.g., -f "C:\\Users\\Name\\Desktop\\cli\\csv"'}),
  }

  static usage = '$ csdx cm:stacks:validate-regex --alias=[ALIAS_NAME] --contentType --globalField --filePath=[FILE_PATH]'

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
    const {flags} = this.parse(CmStacksValidateRegex)

    let authToken
    try {
      authToken = await getAuthToken()
    } catch (error) {
      this.error(regexMessages.errors.login, {
        ref: 'https://www.contentstack.com/docs/developers/cli/authenticate-with-the-cli/#login',
      })
    }

    await inquireAlias(flags)

    let tokenDetails: any
    try {
      tokenDetails = await getManagementToken(flags.alias)
    } catch (error) {
      this.error(regexMessages.errors.tokenNotFound, {
        ref: 'https://www.contentstack.com/docs/developers/cli/authenticate-with-the-cli/#add-management-token',
      })
    }

    await inquireModule(flags)

    try {
      await connectStack(flags, authToken, tokenDetails.apiKey)
    } catch (error: any) {
      this.error(regexMessages.errors.stack.fetch)
    }
  }
}
