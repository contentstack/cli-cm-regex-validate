import * as jsonexport from 'jsonexport'
import * as path from 'path'
import * as fs from 'fs'
const regexMessages = require('../../messages/index.json').validateRegex

export default async function generateOutput(flags: any, invalidRegex: any, tableData: any) {
  if (invalidRegex.length > 0) {
    const resultFile = 'results.csv'
    let storagePath = path.resolve(__dirname, '../../', resultFile)
    if (flags.filePath) {
      if (!fs.existsSync(flags.filePath)) {
        fs.mkdirSync(flags.filePath, {recursive: true})
      }
      storagePath = flags.filePath + resultFile
    }
    jsonexport(invalidRegex, function (error: any, csv: any) {
      if (error) {
        throw new Error(regexMessages.errors.csvOutput)
      }
      fs.writeFileSync(storagePath, csv)
    })
    console.log(regexMessages.tableOutput)
    console.table(tableData)
    console.log(regexMessages.csvOutput, storagePath)
    console.log(regexMessages.docsLink)
  } else {
    console.log(regexMessages.noInvalidRegex)
  }
}
