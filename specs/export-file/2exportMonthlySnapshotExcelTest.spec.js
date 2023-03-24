const {test, expect} = require('@playwright/test');
const fs             = require('fs-extra');
const excelTestData = require('../../utils/excelTestData')
const client_commonPage = require("../../pages/client_common.page");
const srv_commonPage = require("../../pages/srv_common.page");
const srv_branchesPage = require("../../pages/srv_branches.page");
const testData = require("../../data/testData.json");
const util = require('../../utils/utility')

let adminUsr        = testData.users_stage.admin.phone;
let adminPasswd     = testData.users_stage.admin.password;
let smsCode         = testData.users_stage.admin.smsCode;
let downloadLocation = './exportdata/MonthlySnapshotExcel.xlsx'
let firstFilterOption = '0: Object'
let secondFilterOption = '1: Object'
let thirdFilterOption = '2: 2022'
let fourthFilterOption = '6: bc09d1a5-2504-4a4e-86f1-d23db437a26b'
let fifthFilterOption = '3: 5ec3a030-10ba-4703-bcea-1720878de533'
let sixthFilterOption = '2: allProcessors'
let actual, expected

test.describe('Export tests', () => {
  test('Dashboard Monthly Snapshot Excel', async ({context, page, viewport}) => {
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
    
    await test.step('Set Monthly Snapshot filters', async () => {
      await srv_commonPage.scrollDownToMonthlySnapshot(page)
      // await srv_commonPage.waitUntilLoadingCircleIsGone(page)
      // await srv_commonPage.setMonthlySnapshotFirstFilterValue(page, firstFilterOption)
      // await srv_commonPage.waitUntilLoadingCircleIsGone(page)
      // await srv_commonPage.setMonthlySnapshotSecondFilterValue(page, secondFilterOption)
      // await srv_commonPage.waitUntilLoadingCircleIsGone(page)
      // await srv_commonPage.setMonthlySnapshotThirdFilterValue(page, thirdFilterOption)
      // await srv_commonPage.waitUntilLoadingCircleIsGone(page)
      // await srv_commonPage.setMonthlySnapshotFourthFilterValue(page, fourthFilterOption)
      // await srv_commonPage.waitUntilLoadingCircleIsGone(page)
      // await srv_commonPage.setMonthlySnapshotFifthFilterValue(page, fifthFilterOption)
      // await srv_commonPage.waitUntilLoadingCircleIsGone(page)
      // await srv_commonPage.setMonthlySnapshotSixthFilterValue(page, sixthFilterOption)
      await srv_commonPage.waitUntilLoadingCircleIsGone(page)
    })

    await test.step('Click export link', async () => {
      const downloadPromise = page.waitForEvent('download')
      await srv_commonPage.clickMonthlySnapshotExport(page)
      const download = await downloadPromise;
      await download.saveAs(downloadLocation);
    })

    await test.step('Get monthly snaps table header', async () => {
      expected = await srv_commonPage.getMonthlySnapshotChartHeader(page)
    })
  
    await test.step('Open Monthly Snapshot downloaded file header', async () => {
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

