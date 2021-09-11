const safe = require('safe-regex')

const safeRegexCheck = (document: any, invalidRegex: any, tableData: any, type: string) => {
  const beforeCount = invalidRegex.length
  function checkSchemaFieldRegex(schema: any, currentPath = '', nested: boolean) {
    let newPath = ''
    function path(currentPath: string, uid: string) {
      return currentPath.trim() === '' ? uid : [currentPath, uid].join('.')
    }
    schema.forEach((field: any) => {
      newPath = path(currentPath, field.uid)
      if (field.data_type === 'group' || field.data_type === 'global_field') {
        if (field.schema) {
          checkSchemaFieldRegex(field.schema, newPath, true)
        }
      }
      if (field.data_type === 'blocks') {
        field.blocks.forEach((block: any) => {
          if (block.schema) {
            newPath = path(newPath, block.uid)
            checkSchemaFieldRegex(block.schema, newPath, true)
            newPath = path(currentPath, field.uid)
          }
        })
      }
      if (field.format) {
        const result = safe(field.format)
        if (result) {
          newPath = ''
        } else {
          const regexObject = {
            'Module': type,
            'Title': document.title,
            'UID': document.uid,
            'Field Name': field.display_name,
            'Field UID': field.uid,
            'Field Path': newPath,
            'Invalid Regex': field.format,
          }
          invalidRegex.push(regexObject)
          newPath = ''
        }
      } else {
        newPath = ''
      }
    })
    const currentCount = invalidRegex.length - beforeCount
    if (currentCount > 0 && !nested) {
      const tableDataObject = {
        'Module': type,
        'Title': document.title,
        'UID': document.uid,
        'Invalid Regex Count': currentCount,
      }
      tableData.push(tableDataObject)
    }
  }
  checkSchemaFieldRegex(document.schema, '', false)
}

export default safeRegexCheck
