import {cli} from 'cli-ux'
import safeRegexCheck from './safe-regex'
import generateOutput from './output'
const regexMessages = require('../../messages/index.json').validateRegex

export default async function processStack(flags: any, stack: any, startTime: number) {
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
      throw new Error(regexMessages.errors.contentTypes)
    })
  }
  if (flags.globalField) {
    const globalFields = stack.globalField().query(query).find()
    await globalFields.then((globalFields: any) => {
      globalFields.items.forEach((globalField: any) => {
        safeRegexCheck(globalField, invalidRegex, tableData, 'Global Field')
      })
    }).catch((error: Error) => {
      throw new Error(regexMessages.errors.globalFields)
    })
  }
  cli.action.stop(regexMessages.cliAction.processStackStop + (Date.now() - processTime) + ' ms')
  await generateOutput(flags, invalidRegex, tableData)
}
