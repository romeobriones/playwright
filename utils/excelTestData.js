// @flow
import * as ExcelJs from "exceljs";

require('dotenv').config()

let workbookName
let worksheet

class ExcelTestData {
  async getWorkBook(fileName) {
    const workbook = new ExcelJs.Workbook()
    return workbook.xlsx.readFile(fileName)
  }

  async getExcelHeaderData(fileName, sheetName) {
    let data = []
    workbookName = await this.getWorkBook(fileName)
    worksheet = await workbookName.getWorksheet(sheetName)
    let headers = await worksheet.getRow(1).values

    for (let headerCtr = 1; headerCtr < headers.length; headerCtr++) {
      data.push(headers[headerCtr])
    }

    return data
  }

  async getExcelData(fileName, sheetName) {
    workbookName = await this.getWorkBook(fileName)
    worksheet = await workbookName.getWorksheet(sheetName)
    let headers = await worksheet.getRow(1).values
    let rowData = await worksheet.columns[1].values.map(String)

    let excelData = []
    for (let iCtr = 2; iCtr < rowData.length; iCtr++) {
      let rows = await worksheet.getRow(iCtr).values

      let rowInfo = []
      for (let headerCtr = 1; headerCtr < headers.length; headerCtr++) {
        let data = {}
        let value = rows[headerCtr] || ''
        data[headers[headerCtr]] = (typeof value === 'object') ? value.text : value.toString()
        rowInfo.push(data)
      }

      excelData.push(rowInfo)
    }

    return excelData
  }
}

module.exports = new ExcelTestData