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
let downloadLocation = './exportdata/KGCollectedChart.csv'
let firstFilterOption = '0: Object'
let secondFilterOption = '2: Object'
let thirdFilterOption = '6: bc09d1a5-2504-4a4e-86f1-d23db437a26b'
let actual, expected

test.describe('Export tests', () => {
  test('Dashboard KG Collected CSV', async ({context, page, viewport}) => {
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
    
    await test.step('Set KG Collected filters', async () => {
      await srv_commonPage.setKGCollectedFirstFilterValue(page, firstFilterOption)
      await srv_commonPage.setKGCollectedSecondFilterValue(page, secondFilterOption)
      await srv_commonPage.setKGCollectedThirdFilterValue(page, thirdFilterOption)
      await srv_commonPage.waitForNetworkIdle(page)
    })

    await test.step('Click chart menu icon', async () => {
      await srv_commonPage.clickKGCollectedMenuIcon(page)
    })

    // await test.step('Click Download CSV', async () => {
    //   const downloadPromise = page.waitForEvent('download')
    //   await srv_commonPage.clickKGCollectedMenuOptionCSV(page)
    //   const download = await downloadPromise;
    //   await download.saveAs(downloadLocation);
    // })

    await test.step('Get apex main graph header', async () => {
      expected = await srv_commonPage.getKGCollectedChartHeader(page)
    })
  
    await test.step('Get File Header', async () => {
      actual = await srv_commonPage.getKGCollectedFileChartHeader(downloadLocation)
      await expect(actual).toEqual(expected)
    })
  
    await test.step('Then browser is closed and test ends', async () => {
      await page.close();
    })
  })
})

