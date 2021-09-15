import safeRegex from '../../src/utils/safe-regex'
const validDocument = require('../data/validDocument.json')
const invalidDocument = require('../data/invalidDocument.json')
const invalidJsonOutput = require('../data/invalidRegex.json')
const invalidTableOutput = require('../data/tableData.json')
const invalidJsonOutputGf = require('../data/invalidRegexGf.json')
const invalidTableOutputGf = require('../data/tableDataGf.json')

describe('Safe Regex Check in Schema', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  describe('Content Type', () => {
    test('Process Schema with Valid Regex', async () => {
      const invalidRegex: object[] = []
      const tableData: object[] = []
      const moduleType = 'Content Type'
      safeRegex(validDocument, invalidRegex, tableData, moduleType)
      expect(invalidRegex).toStrictEqual([])
      expect(tableData).toStrictEqual([])
    })

    test('Process Schema with Invalid Regex', async () => {
      const invalidRegex: object[] = []
      const tableData: object[] = []
      const moduleType = 'Content Type'
      safeRegex(invalidDocument, invalidRegex, tableData, moduleType)
      expect(invalidRegex).toStrictEqual(invalidJsonOutput)
      expect(tableData).toStrictEqual(invalidTableOutput)
    })
  })

  describe('Global Field', () => {
    test('Process Schema with Valid Regex', async () => {
      const invalidRegex: object[] = []
      const tableData: object[] = []
      const moduleType = 'Global Field'
      safeRegex(validDocument, invalidRegex, tableData, moduleType)
      expect(invalidRegex).toStrictEqual([])
      expect(tableData).toStrictEqual([])
    })

    test('Process Schema with Invalid Regex', async () => {
      const invalidRegex: object[] = []
      const tableData: object[] = []
      const moduleType = 'Global Field'
      safeRegex(invalidDocument, invalidRegex, tableData, moduleType)
      expect(invalidRegex).toStrictEqual(invalidJsonOutputGf)
      expect(tableData).toStrictEqual(invalidTableOutputGf)
    })
  })
})
