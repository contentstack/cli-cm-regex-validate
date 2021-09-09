import {Command, flags} from '@oclif/command'
import {Command as CSCommand} from '@contentstack/cli-command'
import {cli} from 'cli-ux'
import * as contentstackSdk from '@contentstack/management'
import * as Configstore from 'configstore'
import * as jsonexport from 'jsonexport'
import * as path from 'path'
import * as fs from 'fs'
import getAuthToken from '../../../utils/get-auth-token'
import {inquireAlias, inquireModule} from '../../../utils/interactive'
import safeRegexCheck from '../../../utils/safe-regex'
const regexMessages = require('../../../../messages/index.json').validateRegex
const config = new Configstore('contentstack_cli')

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
    const {flags} = this.parse(CmStacksValidateRegex)

    const command = new CSCommand()

    let authToken
    try {
      authToken = await getAuthToken()
    } catch (error) {
      this.error(regexMessages.errors.login, {
        ref: 'https://www.contentstack.com/docs/developers/cli/authenticate-with-the-cli/#login',
      })
    }

    await inquireAlias(flags, regexMessages)

    let tokenDetails: any
    try {
      tokenDetails = command.getToken(flags.alias)
    } catch (error) {
      this.error(regexMessages.tokenNotFound)
    }

    await inquireModule(flags, regexMessages)

    const startTime = Date.now()
    cli.action.start(regexMessages.cliAction.connectStackStart, '', {stdout: true})

    const client = contentstackSdk.client({
      authtoken: config.get('authtoken'),
    })

    const stack = client.stack({api_key: tokenDetails.apiKey})
    stack.fetch().then(async (stack: any) => {
      cli.action.stop(regexMessages.cliAction.connectStackStop + (Date.now() - startTime) + ' ms')
      const processTime = Date.now()
      cli.action.start(regexMessages.cliAction.processStackStart, '', {stdout: true})
      const query = {}
      const invalidRegex: object[] = []
      const tableData: object[] = []
      if (flags.contentType) {
        const contentTypes = stack.contentType().query(query).find()
        await contentTypes.then((contentTypes: any) => {
          contentTypes.items.forEach((contentType: any) => {
            safeRegexCheck(contentType, invalidRegex, tableData, 'Content Type')
          })
        }).catch((error: Error) => {
          this.log(regexMessages.errors.contentTypes, error)
        })
      }
      if (flags.globalField) {
        const globalFields = stack.globalField().query(query).find()
        await globalFields.then((globalFields: any) => {
          globalFields.items.forEach((globalField: any) => {
            safeRegexCheck(globalField, invalidRegex, tableData, 'Global Field')
          })
        }).catch((error: Error) => {
          this.log(regexMessages.errors.globalFields, error)
        })
      }
      cli.action.stop(regexMessages.cliAction.processStackStop + (Date.now() - processTime) + ' ms')
      const resultFile = 'results.csv'
      let storagePath = path.resolve(__dirname, '../../../../', resultFile)
      if (flags.filePath && fs.existsSync(flags.filePath)) {
        storagePath = flags.filePath + resultFile
      } else if (flags.filePath) {
        fs.mkdirSync(flags.filePath, {recursive: true})
        storagePath = flags.filePath + resultFile
      }
      if (invalidRegex.length > 0) {
        jsonexport(invalidRegex, function (error: Error, csv: string) {
          if (error) {
            cli.error(regexMessages.errors.csvOutput)
          }
          fs.writeFileSync(storagePath, csv)
        })
        this.log(regexMessages.tableOutput)
        console.table(tableData)
        this.log(regexMessages.csvOutput, storagePath)
        this.log(regexMessages.docsLink)
      } else {
        this.log(regexMessages.noInvalidRegex)
      }
    }).catch((error: Error) => {
      this.log(regexMessages.errors.stacks, JSON.parse(error.message).errorMessage)
    })
  }
}
