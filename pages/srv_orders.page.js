const srvOrdersEl = require('../elements/srv_orders.element');
const srv_commonPage = require('../pages/srv_common.page');
const commonPage = require('../pages/common.page');
const util        = require('../utils/utility');
const {expect} = require("@playwright/test");
const srvCommonEl = require("../elements/srv_common.element");
const srv_storesEl = require("../elements/srv_stores.element");

class SrvOrdersPage {
  async verifyPageLoaded(page, expect) {
    let textSlug = "/admin/ordersoffsets/list/orders";
    await commonPage.waitForElementDisplayed(page, srvOrdersEl.ordersPanelTitle())
    await commonPage.waitForElementDisplayed(page, srvOrdersEl.ordersAddBtn())
    await expect(page.url()).toContain(textSlug);
  }

  async clickAddOrders(page) {
    await page.click(srvOrdersEl.ordersAddBtn())
  }

  async verifyCreateOrderPageLoaded (page, expect) {
    let textSlug = "/admin/ordersoffsets/register-new-order";
    await commonPage.waitForElementDisplayed(page, srvOrdersEl.createOrderTitle())
    await expect(page.url()).toContain(textSlug);
  }

  async setOrderName(page, orderName) {
    await page.type(srvOrdersEl.orderName(), orderName)
  }

  async setBonusForm(page, createdBranches, bonusData) {
    await this.setBonusName(page, bonusData.bonusName);
    await this.setBonusCountry(page, bonusData.country);
    await this.setBonusBrand(page, bonusData.brand);
    await this.setBonusCategory(page, bonusData.category.value);
    //await srv_ordersPage.setBonusMaterialType(page, bonusData.materialType.option);

    await this.setBonusLimit(page, bonusData.limitBonus);
    await this.setBonusTotalWeight(page, bonusData.totalWeight);
    await this.setMemberBonus(page, bonusData.memberBonus);
    await this.setBranchBonus(page, bonusData.branchBonus);

    for (let index in createdBranches) {
      await this.assignBonusBranches(page, createdBranches[index].branchName)
      let locator = `//*[text()=" + ${createdBranches[index].branchName} "]`
      await page.click(locator)
      locator = `(//*[text()="Edit Bonus Options "])[${parseInt(index) + 1}]`
      await page.click(locator)
      await this.setBranchToBranchBonusValue(page, 'any')
      await this.clickBonusInformationSave(page)
    }

    await this.clickCreateBonus(page)

    await util.delay()
    await srv_commonPage.setSmsField(page, expect, bonusData.smsCode)
    await srv_commonPage.clickSmsSubmit(page)
  }

  async setBonusName(page, bonusName) {
    await page.type(srvOrdersEl.bonusName(), bonusName)
  }

  async setCountry(page, countryName) {
    await commonPage.selectDropDownByText(page, srvOrdersEl.country(), countryName)
  }

  async setBonusCountry(page, countryName) {
    await commonPage.selectDropDownByText(page, srvOrdersEl.bonusCountry(), countryName)
  }

  async setBonusBrand(page, brandName) {
    let locator = '//*[contains(@class, "dropdown-container")]//li[contains(text(), "Plastic Bank")]'
    for (let iCtr = 0; iCtr < brandName.length - 1; iCtr++) {
      await page.type(srvOrdersEl.bonusBrand(), brandName[iCtr])
      await util.delay(500)
      if (await commonPage.waitForElementDisplayed(page, locator, 0, true)) {
        await page.click(locator)
        break
      }
    }
  }

  async setBonusLimit (page, bonusLimit) {
    await page.locator(srvOrdersEl.bonusLimit()).fill('')
    await page.type(srvOrdersEl.bonusLimit(), bonusLimit)
  }

  async setBonusTotalWeight (page, totalWeight) {
    await page.locator(srvOrdersEl.totalWeight()).fill('')
    await page.type(srvOrdersEl.totalWeight(), totalWeight)
  }

  async setPriceType(page, priceType) {
    await commonPage.selectDropdownByValue(page, srvOrdersEl.priceType(), priceType)
  }

  async setBonusCategory(page, categoryName) {
    await commonPage.selectDropdownByValue(page, srvOrdersEl.category(), categoryName)
  }

  async setMaterialType(page, materialType) {
    await commonPage.selectDropdownByValue(page, srvOrdersEl.materialType(), materialType)
  }

  async setBonusMaterialType(page, materialType) {
    await commonPage.selectDropdownByValue(page, srvOrdersEl.bonusMaterialType(), materialType)
  }

  async clickInfiniteAmount (page) {
    await page.click(srvOrdersEl.infiniteAmount());
  }

  async setMemberProfit(page, memberProfit) {
    await page.locator(srvOrdersEl.membersProfit()).fill('')
    await page.type(srvOrdersEl.membersProfit(), memberProfit)
  }

  async setBranchProfit(page, branchProfit) {
    await page.locator(srvOrdersEl.branchProfit()).fill('')
    await page.type(srvOrdersEl.branchProfit(), branchProfit)
  }

  async setMemberBonus(page, memberBonus) {
    await page.locator(srvOrdersEl.memberBonus()).fill('')
    await page.type(srvOrdersEl.memberBonus(), memberBonus)
  }

  async setBranchBonus(page, branchBonus) {
    await page.locator(srvOrdersEl.branchProfit()).fill('')
    await page.type(srvOrdersEl.branchProfit(), branchBonus)
  }

  async assignProcessor(page) {

  }

  async clickOrderBonusTab(page) {
    await page.click(srvOrdersEl.bonusTab())
  }

  async verifyOrderBonusPageDisplayed (page, expect) {
    let textSlug = "/admin/ordersoffsets/list/offsets";
    let tdResult = '//table//tr[@class="ng-star-inserted"]/td'
    await commonPage.waitForElementDisplayed(page, srvOrdersEl.bonusPageTitle())
    await commonPage.waitForElementDisplayed(page, tdResult)
    await expect(page.url()).toContain(textSlug);
  }

  async clickAddBonus(page) {
    await page.click(srvOrdersEl.bonusAddBtn())
  }
  
  async clickBonusExport(page) {
    await page.click(srvOrdersEl.bonusExportBtn())
  }
  
  async clickOrderBonusExchangeHistoryExport(page) {
    await page.click(srvOrdersEl.orderBonusExchangeHistoryExport())
  }
  
  async getOrderBonusTableHeader (page) {
    return srv_commonPage.getReportChartHeader(page, srvOrdersEl.orderBonusTableHeader())
  }

  async verifyCreateBonusPageLoaded (page, expect) {
    let textSlug = "/admin/ordersoffsets/register-new-offset"
    await commonPage.waitForElementDisplayed(page, srvOrdersEl.newBonusDetails())
    await expect(page.url()).toContain(textSlug)
  }

  async assignBonusProcessor(page, processorName) {
    await page.click(srvOrdersEl.assignProcessor())
    await commonPage.waitForElementDisplayed(page, srvOrdersEl.nameSearch())
    await page.type(srvOrdersEl.nameSearch(), processorName)
    await page.click(srvOrdersEl.processorModalTitle())
    let locator = `//*[contains(text(), "${processorName}")]`
    await commonPage.waitForElementDisplayed(page, locator)
    await page.click(locator)
    await page.click(srvOrdersEl.confirmButton())
  }

  async assignBonusBranches (page, branchName) {
    await page.click(srvOrdersEl.assignBranches())
    await commonPage.waitForElementDisplayed(page, srvOrdersEl.nameSearch())
    await page.type(srvOrdersEl.nameSearch(), branchName)
    await page.click(srvOrdersEl.branchesModalTitle())
    let locator = `//*[contains(text(), "${branchName}")]`
    await commonPage.waitForElementDisplayed(page, locator)
    await page.click(locator)
    await page.click(srvOrdersEl.confirmButton())
  }

  async setBranchToBranchBonusValue(page, value) {
    await commonPage.selectDropdownByValue(page, srvOrdersEl.branchToBranchBonus(), value)
  }

  async clickBonusInformationSave (page) {
    await page.click(srvOrdersEl.bonusInformationSave())
  }

  async clickCreateBonus (page) {
    await page.click(srvOrdersEl.createBonusButton())
  }

  async verifyBonusItemCreated (page, expect, branchName) {
    await this.verifyBonusPageDisplayed(page, expect)
    await commonPage.waitForElementDisplayed(page, srvOrdersEl.nameSearch())
    await page.click(srvOrdersEl.nameSearch())
    await page.type(srvOrdersEl.nameSearch(), branchName)
    let locator = `(${srvOrdersEl.bonusOverviewTableResults()})[1]`
    await commonPage.waitForElementDisplayed(page, locator)
    let text = (await page.locator(locator).innerText()).valueOf()
    await expect(text).toContain(branchName)
  }
  
  async sortPeopleImpactedInDesc(page) {
    await page.click(srvOrdersEl.peopleImpactedColumnOrder())
    await commonPage.waitForElementNotDisplayed(page, srv_storesEl.storeTableLoader(), 10)
    await page.click(srv_storesEl.tokenColumnOrder())
    await commonPage.waitForElementNotDisplayed(page, srv_storesEl.storeTableLoader(), 10)
  }
  
  async clickOrderBonusEntryByName (page, name) {
    await page.type(srvOrdersEl.bonusOrderNameTableFilter(), name)
    let locator = `(${srvOrdersEl.orderBonusTableData()})[1]`
    await commonPage.waitForElementDisplayed(page, locator)
    await page.click(locator)
  }
  
  async clickOrderBonusExchangeHistory (page) {
    await commonPage.waitForElementDisplayed(page, srvOrdersEl.orderBonusExchangeHistoryTab())
    await page.click(srvOrdersEl.orderBonusExchangeHistoryTab())
  }
  
  async waitForOrderBonusExchangeHistoryDataToLoad (page) {
    await commonPage.waitForElementDisplayed(page, srvOrdersEl.orderBonusExchangeHistoryTransactionData())
  }
}

module.exports = new SrvOrdersPage;
