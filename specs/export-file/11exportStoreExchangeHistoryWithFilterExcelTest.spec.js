const {test, expect} = require('@playwright/test');
const fs             = require('fs-extra');
const excelTestData = require('../../utils/excelTestData')
const client_commonPage = require("../../pages/client_common.page");
const srv_commonPage = require("../../pages/srv_common.page");
const srv_processorsPage = require("../../pages/srv_processors.page");
const testData = require("../../data/testData.json");
const util = require('../../utils/utility')
const srv_storesPage = require("../../pages/srv_stores.page");

let adminUsr        = testData.users_stage.admin.phone;
let adminPasswd     = testData.users_stage.admin.password;
let smsCode         = testData.users_stage.admin.smsCode;
let downloadLocation = './exportdata/StoreExchangeHistory.xlsx'
let expectedHeaders = './exportdata/Expected_StoreExchangeHistory.xlsx'
let actual, expected
let filterDate = {
  startDate: '2023-01-01',
  endDate: '2023-12-31'
}

test.describe('Export tests', () => {
  test('Dashboard - Store Exchange History With Filter Excel', async ({context, page, viewport}) => {
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
    
    await test.step('When user navigates to Store', async () => {
      await srv_commonPage.clickMenuIcon(page)
      await srv_commonPage.clickMenuStores(page)
    })
    
    await test.step('Then user is redirected to Store area', async () => {
      await srv_storesPage.verifyPageLoaded(page, expect);
    })
    
    await test.step('Sort tokens in descending order', async () => {
      await srv_storesPage.clickTokenSortDesc(page);
    })
    
    await test.step('Click any Store', async () => {
      await srv_storesPage.clickStoreEntryByIndex(page, 0);
    })
    
    await test.step('Click Exchange History', async () => {
      await srv_storesPage.clickExchangeHistory(page);
      await srv_storesPage.waitForExchangeHistoryDataToLoad(page)
    })
    
    await test.step('Click export link', async () => {
      // TODO: This part is expected to fail if there's no data between dates. Need to add an error handling from app side.
      const downloadPromise = page.waitForEvent('download')
      await srv_storesPage.clickStoreExchangeHistoryExport(page)
      const download = await downloadPromise;
      await download.saveAs(downloadLocation);
    })
    
    await test.step('Get Store Exchange History table header', async () => {
      expected = await excelTestData.getExcelHeaderData(expectedHeaders, 'Sheet1')
    })
    
    await test.step('Open Store downloaded file header', async () => {
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

