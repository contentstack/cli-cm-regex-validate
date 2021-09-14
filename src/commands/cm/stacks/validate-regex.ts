import {Command, flags} from '@oclif/command'
import getAuthToken from '../../../utils/get-auth-token'
import {inquireAlias, inquireModule} from '../../../utils/interactive'
import getManagementToken from '../../../utils/get-management-token'
import connectStack from '../../../utils/connect-stack'
const regexMessages = require('../../../../messages/index.json').validateRegex

export default class CmStacksValidateRegex extends Command {
  static description = regexMessages.command.description

  static flags = {
    help: flags.help({char: 'h', description: regexMessages.command.help}),
    alias: flags.string({char: 'a', description: regexMessages.command.alias}),
    contentType: flags.boolean({char: 'c', description: regexMessages.command.contentTypes}),
    globalField: flags.boolean({char: 'g', description: regexMessages.command.globalFields}),
    filePath: flags.string({char: 'f', description: regexMessages.command.filePath}),
  }

  static usage = 'cm:stacks:validate-regex --alias=[ALIAS_NAME] --contentType --globalField --filePath=[FILE_PATH]'

  static examples = [
    '$ csdx cm:stacks:validate-regex',
    '$ csdx cm:stacks:validate-regex --alias=\'Alias Name\' -a \'Alias Name\'',
    '$ csdx cm:stacks:validate-regex --contentType -c',
    '$ csdx cm:stacks:validate-regex --globalField -g',
    '$ csdx cm:stacks:validate-regex --filePath=\'path/to/the/directory/\' -f \'path/to/the/directory\'',
    '$ csdx cm:stacks:validate-regex -a \'Alias Name\' -c -g',
    '$ csdx cm:stacks:validate-regex -a \'Alias Name\' -c -g -f \'path/to/the/directory\'',
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
