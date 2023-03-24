const {test, expect} = require('@playwright/test');
const fs             = require('fs-extra');
const excelTestData = require('../../utils/excelTestData')
const client_commonPage = require("../../pages/client_common.page");
const srv_commonPage = require("../../pages/srv_common.page");
const srv_branchesPage = require("../../pages/srv_branches.page");
const testData = require("../../data/testData.json");
const util = require('../../utils/utility')
const srv_ordersPage = require("../../pages/srv_orders.page");

let adminUsr        = testData.users_stage.admin.phone;
let adminPasswd     = testData.users_stage.admin.password;
let smsCode         = testData.users_stage.admin.smsCode;
let downloadLocation = './exportdata/BranchesExchangeHistoryWithFilter.xlsx'
let expectedHeaders = './exportdata/Expected_BranchesExchangeHistory.xlsx'
let actual, expected
let filterDate = {
  startDate: '2023-01-01',
  endDate: '2023-12-31'
}

test.describe('Export tests', () => {
  test('Dashboard - Branches Exchange History With Filter Excel', async ({context, page, viewport}) => {
    await test.step('When user opens plasticBank client web', async () => {
      viewport = null
      await page.goto(process.env.SRVURL)
    })
    
    await test.step('Then web landing page is displayed', async () => {
      await client_commonPage.verifyWebLandingPage(expect);
    })
    
    await test.step('When user logs in to web landing page', async () => {
      await srv_commonPage.login(page, expect, adminUsr, adminPasswd, smsCode);
    })
    
    await test.step('Then user is redirected to dashboard area', async () => {
      await srv_commonPage.verifyDashboardArea(page, expect);
    })
    
    await test.step('When user navigates to branches', async () => {
      await srv_commonPage.clickMenuIcon(page)
      await srv_commonPage.clickMenuBranches(page)
    })
    
    await test.step('Then user is redirected to branches area', async () => {
      await srv_branchesPage.verifyPageLoaded(page, expect);
    })
    
    await test.step('Click any branches', async () => {
      await srv_branchesPage.clickBranchEntryByIndex(page, 0);
    })
    
    await test.step('Click Exchange History', async () => {
      await srv_branchesPage.clickExchangeHistory(page);
      await srv_branchesPage.waitForExchangeHistoryDataToLoad(page)
    })
    
    await test.step('Set Filter', async () => {
      await srv_branchesPage.setExchangeHistoryDateFilter(page, filterDate);
    })
    
    await test.step('Click export link', async () => {
      const downloadPromise = page.waitForEvent('download')
      await srv_branchesPage.clickBranchesExchangeHistoryExport(page)
      const download = await downloadPromise;
      await download.saveAs(downloadLocation);
    })
  
    await test.step('Get Branches Exchange History table header', async () => {
      expected = await excelTestData.getExcelHeaderData(expectedHeaders, 'Sheet1')
    })
    
    await test.step('Open Branches downloaded file header', async () => {
      actual = await excelTestData.getExcelHeaderData(downloadLocation, 'Sheet1')
      await expect(actual).toEqual(expected)
    })
    
    await test.step('Logout', async () => {
      await srv_commonPage.logout(page)
    })
    
    await test.step('Then browser is closed and test ends', async () => {
      await page.close();
    })
  })
})

