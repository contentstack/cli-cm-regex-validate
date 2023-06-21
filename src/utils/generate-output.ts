import * as jsonexport from 'jsonexport'
import * as Table from 'cli-table3'
import * as path from 'path'
import * as fs from 'fs'
import { cliux } from '@contentstack/cli-utilities'
const regexMessages = require('../../messages/index.json').validateRegex

export default async function generateOutput(flags: any, invalidRegex: any, tableData: any) {
  if (invalidRegex.length > 0) {
    const resultFile = 'results.csv'
    let storagePath = path.resolve(__dirname, '../../results')
    if (flags.filePath) {
      storagePath = flags.filePath
    }
    if (!fs.existsSync(storagePath)) {
      fs.mkdirSync(storagePath, {recursive: true})
    }
    storagePath = path.resolve(storagePath, resultFile)
    jsonexport(invalidRegex, function (error: any, csv: any) {
      if (error) {
        throw new Error(regexMessages.errors.csvOutput)
      }
      fs.writeFileSync(storagePath, csv)
    })
    console.log(regexMessages.output.tableOutput)
    const table = new Table({
      head: ['Module', 'Title', 'UID', 'Invalid Regex Count'],
    })
    tableData.forEach((row: any) => {
      table.push(row)
    })
    cliux.print(table.toString())
    cliux.print(regexMessages.output.csvOutput)
    cliux.print(storagePath)
    cliux.print(regexMessages.output.docsLink)
  } else {
    cliux.print(regexMessages.output.noInvalidRegex)
  }
}
