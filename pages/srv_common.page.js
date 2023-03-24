const srvCommonEl = require('../elements/srv_common.element');
const commonPage = require('../pages/common.page');
const util        = require('../utils/utility');
const srvBranchesEl = require("../elements/srv_branches.element");

class SrvCommonPage {

  async login(page, expect, user, password, smsCode) {
    await commonPage.waitForElementDisplayed(page, srvCommonEl.usernameTextbox())
    await expect(srvCommonEl.usernameTextbox()).toBeTruthy();
    await page.type(srvCommonEl.usernameTextbox(), user);
    await page.type(srvCommonEl.passwordTextbox(), password);
    await page.click(srvCommonEl.loginBtn());
    await this.setSms(page, expect, smsCode)
  }

  async setSms (page, expect, smsCode) {
    await commonPage.waitForElementDisplayed(page, srvCommonEl.smsCode())
    for (let index = 0; index < smsCode.length; index++) {
      await page.type(`(${srvCommonEl.smsCode()})[${index + 1}]`, smsCode[index])
    }
  }

  async setSmsField (page, expect, smsCode) {
    await commonPage.waitForElementDisplayed(page, srvCommonEl.smsCode())
    await page.type(srvCommonEl.smsCode(), smsCode)
  }

  async clickSmsSubmit(page) {
    await page.click(srvCommonEl.smsSubmit())
  }

  async verifyDashboardArea(page, expect) {
    let textSlug = "/admin/dashboard";
    await commonPage.waitForElementDisplayed(page, srvCommonEl.avatar())
    await commonPage.waitForElementDisplayed(page, srvCommonEl.apexChart())
    await expect(page.url()).toContain(textSlug);
  }

  async logout(page) {
    await util.delay();
    await page.click(srvCommonEl.avatar());
    await page.click(srvCommonEl.logoutLink());
    await util.delay();
  }

  async clickMenuMembers(page) {
    await page.click(srvCommonEl.menuMembers())
  }

  async clickMenuIcon(page) {
    if (process.env.ISMOBILE === 'true') {
      await page.click(srvCommonEl.menuHamburger())
    }
  }

  async clickMenuBranches(page) {
    await page.click(srvCommonEl.menuBranches())
  }

  async clickMenuProcessors(page) {
    await page.click(srvCommonEl.menuProcessors())
  }

  async clickMenuStores(page) {
    await page.click(srvCommonEl.menuStores())
  }

  async clickMenuUsers() {
    await srvCommonEl.menuUsers().click();
  }

  async clickMenuOrders(page) {
    await page.click(srvCommonEl.menuOrders())
  }

  async clickKGCollectedMenuIcon(page) {
    await page.click(srvCommonEl.apexMenu())
  }
  
  async clickKGCollectedMenuOptionCSV(page) {
    await commonPage.waitForElementDisplayed(page, srvCommonEl.apexOptionDownloadCSV())
    await page.click(srvCommonEl.apexOptionDownloadCSV())
  }
  
  async getKGCollectedChartHeader (page) {
    let verticalHeaderText = []
    let elements = await page.$$(srvCommonEl.apexChartXAxis())
    
    for (const [index, element] of elements.entries()) {
      verticalHeaderText.push((await elements[index].textContent()).substring(0, 3))
    }
    
    let horizontalHeaderText = await page.locator(srvCommonEl.apexChartLegends()).innerText()
    return {
      verticalHeaderText: verticalHeaderText.join(','),
      horizontalHeaderText: `category,${horizontalHeaderText.split('\n').join(',')}`
    }
  }
  
  async getMonthlySnapshotChartHeader (page) {
    return this.getReportChartHeader(page, srvCommonEl.monthlySnapshotHeader())
  }
  
  async getKGCollectedFileChartHeader(downloadLocation) {
    let horizontalHeaderText = (await util.getFileStringByLine(downloadLocation, 1))
    let verticalHeaderArray = []
    let lines = (await util.getArrayFileStrings(downloadLocation)).split('\n')
    for (let [index, line] of lines.entries()) {
      if (index > 0) {
        verticalHeaderArray.push(line.split(',')[0])
      }
    }
    
    return {
      verticalHeaderText: verticalHeaderArray.join(','),
      horizontalHeaderText: horizontalHeaderText
    }
  }
  
  async setKGCollectedFirstFilterValue(page, value) {
    await commonPage.selectDropdownByValue(page, srvCommonEl.kgCollectedFirstFilterDropdown(), value)
  }
  
  async setKGCollectedSecondFilterValue(page, value) {
    await commonPage.selectDropdownByValue(page, srvCommonEl.kgCollectedSecondFilterDropdown(), value)
  }
  
  async setKGCollectedThirdFilterValue(page, value) {
    await commonPage.selectDropdownByValue(page, srvCommonEl.kgCollectedThirdFilterDropdown(), value)
  }
  
  async waitForNetworkIdle(page) {
    console.log('Executing waitForNetworkIdle()')
    await page.waitForLoadState('networkidle')
  }
  
  async setMonthlySnapshotFirstFilterValue(page, value) {
    await commonPage.selectDropdownByValue(page, srvCommonEl.monthlySnapshotFirstFilterDropdown(), value)
  }
  
  async setMonthlySnapshotSecondFilterValue(page, value) {
    await commonPage.selectDropdownByValue(page, srvCommonEl.monthlySnapshotSecondFilterDropdown(), value)
  }
  
  async setMonthlySnapshotThirdFilterValue(page, value) {
    await commonPage.selectDropdownByValue(page, srvCommonEl.monthlySnapshotThirdFilterDropdown(), value)
  }
  
  async setMonthlySnapshotFourthFilterValue(page, value) {
    await commonPage.selectDropdownByValue(page, srvCommonEl.monthlySnapshotFourthFilterDropdown(), value)
  }
  
  async setMonthlySnapshotFifthFilterValue(page, value) {
    await commonPage.selectDropdownByValue(page, srvCommonEl.monthlySnapshotFifthFilterDropdown(), value)
  }
  
  async setMonthlySnapshotSixthFilterValue(page, value) {
    await commonPage.selectDropdownByValue(page, srvCommonEl.monthlySnapshotSixthFilterDropdown(), value)
  }
  
  async scrollDownToMonthlySnapshot (page) {
    await commonPage.scrollIntoView(page, srvCommonEl.monthlySnapshotFirstFilterDropdown())
  }
  
  async clickMonthlySnapshotExport (page) {
    await page.click(srvCommonEl.monthlySnapshotExportButton())
  }
  
  async waitUntilLoadingCircleIsGone(page) {
    await commonPage.waitForElementNotDisplayed(page, srvCommonEl.loader(), 30)
  }
  
  async scrollDownToBranchReport (page) {
    await commonPage.scrollIntoView(page, srvCommonEl.branchReportTitle())
  }
  
  async scrollDownToBranchesTransactionHistoryReport (page) {
    await commonPage.scrollIntoView(page, srvCommonEl.branchesTransactionHistoryExportButton())
  }
  
  async scrollDownToProcessorReport (page) {
    await commonPage.scrollIntoView(page, srvCommonEl.processorReportTitle())
  }
  
  async scrollDownToTokenExchangeHistoryReport (page) {
    await commonPage.scrollIntoView(page, srvCommonEl.tokenExchangeHistoryReportExportButton())
  }
  
  async setTokenExchangeHistoryDateFilter(page, startDate, endDate) {
    await this.clickTokenExchangeHistoryDateFilter(page)
    let arrStartDate = startDate.split('-')
    let arrEndDate = endDate.split('-')
    
    // start day
    let dayLocator = `${srvCommonEl.tokenExchangeHistoryDatePickerDay()}//*[text()=" ${parseInt(arrStartDate[2])} "]`
    await page.click(dayLocator)
    
    // end day
    dayLocator = `${srvCommonEl.tokenExchangeHistoryDatePickerDay()}//*[text()=" ${parseInt(arrEndDate[2])} "]`
    await page.click(dayLocator)
  }
  
  async clickTokenExchangeHistoryDateFilter (page) {
    await commonPage.waitForElementDisplayed(page, srvCommonEl.tokenExchangeHistoryDateFilter())
    await page.click(srvCommonEl.tokenExchangeHistoryDateFilter())
  }
  
  async clickBranchesTransactionHistoryDateDateFilter (page) {
    console.log(`Executing clickBranchesTransactionHistoryDateDateFilter()`)
    await commonPage.waitForElementDisplayed(page, srvCommonEl.branchesTransactionHistoryDateFilter())
    await page.click(srvCommonEl.branchesTransactionHistoryDateFilter())
  }
  
  async waitUntilBranchReportDataDisplayed (page) {
    return commonPage.waitForElementDisplayed(page, srvCommonEl.branchReportRowData(), 20)
  }
  
  async setDashboardBranchReportDateFilter (page, dateData) {
    await this.clickDashboardBranchReportDateFilter(page)
    await this.setDashboardBranchReportPickerDate(page, dateData.startDate)
    await this.setDashboardBranchReportPickerDate(page, dateData.endDate)
  }
  
  async clickDashboardBranchReportDateFilter (page) {
    console.log(`Executing clickBranchesTransactionHistoryDateDateFilter()`)
    await commonPage.waitForElementDisplayed(page, srvCommonEl.branchDashboardDateFilter())
    await page.click(srvCommonEl.branchDashboardDateFilter())
  }
  
  async setDashboardBranchReportPickerDate(page, date) {
    console.log(`Executing setBranchesTransactionHistoryStartDate(${date})`)
    let arrStartDate = date.split('-')
    let dayLocator = `${srvCommonEl.branchDashboardDatePickerDay()}//*[text()=" ${parseInt(arrStartDate[2])} "]`
    await commonPage.selectDropdownByValue(page, srvCommonEl.branchDashboardDatePickerYear(), `${parseInt(arrStartDate[0])}`) // year
    await commonPage.selectDropdownByValue(page, srvCommonEl.branchDashboardDatePickerMonth(), `${parseInt(arrStartDate[1])}`) // month
    await page.click(dayLocator) // day
  }
  
  async waitUntilBranchesTransactionHistoryDataDisplayed (page) {
    console.log(`Executing waitUntilBranchesTransactionHistoryDataDisplayed()`)
    return commonPage.waitForElementDisplayed(page, srvCommonEl.branchesTransactionHistoryRowData(), 20)
  }
  
  async waitUntilProcessorReportDataDisplayed (page) {
    console.log(`Executing waitUntilProcessorReportDataDisplayed()`)
    return commonPage.waitForElementDisplayed(page, srvCommonEl.processorReportRowData(), 20)
  }
  
  async setBranchesTransactionHistoryDate(page, dateData) {
    console.log(`Executing setBranchesTransactionHistoryDate(${dateData})`)
    await this.clickBranchesTransactionHistoryDateDateFilter(page)
    await this.setBranchesTransactionHistoryPickerDate(page, dateData.startDate)
    await this.setBranchesTransactionHistoryPickerDate(page, dateData.endDate)
  }
  
  async setBranchesTransactionHistoryPickerDate(page, date) {
    console.log(`Executing setBranchesTransactionHistoryStartDate(${date})`)
    let arrStartDate = date.split('-')
    let dayLocator = `${srvCommonEl.branchesTransactionHistoryDatePickerDay()}//*[text()=" ${parseInt(arrStartDate[2])} "]`
    await commonPage.selectDropdownByValue(page, srvCommonEl.branchesTransactionHistoryDatePickerYear(), `${parseInt(arrStartDate[0])}`) // year
    await commonPage.selectDropdownByValue(page, srvCommonEl.branchesTransactionHistoryDatePickerMonth(), `${parseInt(arrStartDate[1])}`) // month
    await page.click(dayLocator) // day
  }
  
  async clickBranchReportExport (page) {
    console.log('Executing clickBranchReportExport()')
    await this.clickReportExportButton(page, srvCommonEl.branchReportExportButton())
  }
  
  async clickBranchesTransactionHistoryExport (page) {
    console.log('Executing clickBranchReportExport()')
    await this.clickReportExportButton(page, srvCommonEl.branchesTransactionHistoryExportButton())
  }
  
  async clickProcessorReportExport (page) {
    console.log('Executing clickProcessorReportExport()')
    await this.clickReportExportButton(page, srvCommonEl.processorReportExportButton())
  }
  
  async clickTokenExchangeHistoryReportExport (page) {
    console.log('Executing clickProcessorReportExport()')
    await this.clickReportExportButton(page, srvCommonEl.tokenExchangeHistoryReportExportButton())
  }
  
  async clickReportExportButton(page, locator) {
    console.log(`Executing clickReportExportButton(${locator})`)
    await page.click(locator)
  }
  
  async getBranchReportTableHeader (page) {
    return this.getReportChartHeader(page, srvCommonEl.branchReportHeader())
  }
  
  async getBranchesTransactionHistoryChartHeader (page) {
    return this.getReportChartHeader(page, srvCommonEl.branchesTransactionHistoryHeader())
  }
  
  async getProcessorReportChartHeader (page) {
    return this.getReportChartHeader(page, srvCommonEl.processorReportHeader())
  }
  
  async getTokenExchangeHistoryReportChartHeader (page) {
    return this.getReportChartHeader(page, srvCommonEl.tokenExchangeHistoryReportHeader())
  }
  
  async getReportChartHeader (page, locator) {
    let elements = await page.$$(locator)
    let texts = []
    let text = ''
    for (let [index, element] of elements.entries()) {
      let newLocator = `(${locator})[${index + 1}]//input`
      text = await element.innerText()
      if (text === '') text = await page.locator(newLocator).getAttribute('placeholder')
      texts.push(text)
    }

    return texts
  }
}

module.exports = new SrvCommonPage;
