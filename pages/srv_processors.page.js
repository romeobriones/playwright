const srv_processorsEl = require('../elements/srv_processors.element');
const srv_commonEl     = require('../elements/srv_common.element');
const util             = require('../utils/utility');
const commonPage = require("./common.page");
const srvProcessorsEl = require("../elements/srv_processors.element");
const srvBranchesEl = require("../elements/srv_branches.element");

class SrvProcessorsPage {
	
	async verifyPageLoaded(page, expect) {
		let textSlug = "/admin/recyclingcenter";
		await commonPage.waitForElementDisplayed(page, srvProcessorsEl.panelTitle())
		await commonPage.waitForElementDisplayed(page, srvProcessorsEl.processorAddBtn(), 10)
		await commonPage.waitForElementNotDisplayed(page, srvProcessorsEl.processorTableLoader(), 10)
		await expect(page.url()).toContain(textSlug);
	}
	
	async verifyAreaProcessors() {
		let headerText = await srv_processorsEl.processorHeader().getText();
		
		expect(await headerText).toEqual('Processors');
		expect(await srv_processorsEl.processorAddBtn().isPresent()).toBeTruthy();
	}
	
	async verifyAddProcessorDetailsArea() {
		let headerText = await srv_processorsEl.processorDetailsHeader().getText();
		
		expect(await headerText).toEqual('Details');
	}
	
	async addNewProcessor(memberAdded) {
		let name      = memberAdded.name;
		let cCode     = memberAdded.cCode;
		let phoneNum  = memberAdded.phoneNum;
		let nth       = memberAdded.nth;
		let email     = memberAdded.email;
		let created   = memberAdded.created;
		
		if(created == false)
			return {
				name     : name,
				cCode    : cCode,
				phoneNum : phoneNum,
				country  : countrySelected,
				nth      : nth,
				email    : email,
				created  : false
			}
		
		await util.waitUntilNotVisible(srv_commonEl.loader());
		await srv_processorsEl.processorAddBtn().click();
		await util.delay();
		await this.verifyAddProcessorDetailsArea();
		await util.delay();
		await srv_processorsEl.processorAddBtn().click();
		await util.waitUntilPresent(srv_processorsEl.processorDetailSearch());
		await srv_processorsEl.processorDetailSearch().clear().sendKeys(cCode + phoneNum);
		await util.waitUntilPresent(srv_processorsEl.processorDetailSearchIcon());
		await srv_processorsEl.processorDetailSearchIcon().click();
		await util.waitUntilPresent(srv_processorsEl.processorMemberInfo());
		await srv_processorsEl.processorCreateBtnModal().click();
		await srv_processorsEl.processorDetailSchedMon().click();
		await srv_processorsEl.processorDetailSchedTue().click();
		await srv_processorsEl.processorDetailSchedWed().click();
		await srv_processorsEl.processorDetailSchedThu().click();
		await srv_processorsEl.processorDetailSchedFri().click();
		await srv_processorsEl.processorDetailSchedSat().click();
		await srv_processorsEl.processorDetailSchedSun().click();
		await srv_processorsEl.processorDetailName().clear().sendKeys(name);
		let countrySelected = await util.selectDropdownbyNum(srv_processorsEl.processorDetailCountry(), nth);
		await srv_processorsEl.processorDetailEmail().clear().sendKeys(email);
		await srv_processorsEl.processorDetailAddressArrow().click();
		await util.waitUntilPresent(srv_processorsEl.processorDetailAddressModalTxt());
		await srv_processorsEl.processorDetailAddressModalTxt().clear().sendKeys(countrySelected);
		await util.delay();
		
		if (await srv_processorsEl.processorDetailAddOptionsNone() > 0)
			await srv_processorsEl.processorDetailAddOptions().click();
		else {
			await srv_processorsEl.closeMapBtn().click();
			console.log("      Your attempt to add a processor was not successfull\n      because " + countrySelected + " is not registered in googlemaps");
			
			return {
				name     : name,
				cCode    : cCode,
				phoneNum : phoneNum,
				country  : countrySelected,
				nth      : nth,
				email    : email,
				created  : false
			}
		}
		
		await util.delay();
		await srv_processorsEl.processorDetailAddressModalOKBtn().click();
		await util.delay();
		await srv_processorsEl.processorCreateBtn().click();
		await util.waitUntilNotVisible(srv_commonEl.loader());
		
		let successfullRedirect = await browser.getCurrentUrl();
		
		if (await successfullRedirect == 'https://qa-admin.cognitionfoundry.io/#/admin/recyclingcenter') {
			created = true;
			console.log("    √ Then a new processor is created by member " + cCode + phoneNum + " at " + countrySelected);
		}
		else {
			created = false;
			console.log("      Your attempt to add a processor was not successfull!");
		}
		
		return {
			name     : name,
			cCode    : cCode,
			phoneNum : phoneNum,
			country  : countrySelected,
			nth      : nth,
			email    : email,
			created  : created
		}
	}
	
	async clickProcessorEntryByIndex (page, index) {
		let locator = `(${srvProcessorsEl.processorTableData()})[${index + 1}]`
		await commonPage.waitForElementDisplayed(page, locator)
		await page.click(locator)
	}
	
	async clickExchangeHistory (page) {
		await commonPage.waitForElementDisplayed(page, srvProcessorsEl.processorExchangeHistoryTab())
		await page.click(srvProcessorsEl.processorExchangeHistoryTab())
	}
	
	async waitForExchangeHistoryDataToLoad (page) {
		await commonPage.waitForElementDisplayed(page, srvProcessorsEl.processorExchangeHistoryTab())
	}
	
	async clickProcessorExchangeHistoryExport (page) {
		console.log('Executing clickProcessorExchangeHistoryExport()')
		await page.click(srvProcessorsEl.processorExchangeHistoryExportButton())
	}
	
	async setExchangeHistoryDateFilter (page, dateData) {
		await this.clickExchangeHistoryDateFilter(page)
		await this.setExchangeHistoryPickerDate(page, dateData.startDate)
		await this.setExchangeHistoryPickerDate(page, dateData.endDate)
	}
	
	async setExchangeHistoryPickerDate(page, date) {
		console.log(`Executing setBranchesTransactionHistoryEndDate(${date})`)
		let arrEndDate = date.split('-')
		let dayLocator = `${srvProcessorsEl.processorExchangeHistoryDatePickerDay()}//*[text()=" ${parseInt(arrEndDate[2])} "]`
		await commonPage.selectDropdownByValue(page, srvProcessorsEl.processorExchangeHistoryDatePickerYear(), `${parseInt(arrEndDate[0])}`)
		await commonPage.selectDropdownByValue(page, srvProcessorsEl.processorExchangeHistoryDatePickerMonth(), `${parseInt(arrEndDate[1])}`)
		await page.click(dayLocator)
	}
	
	async clickExchangeHistoryDateFilter (page) {
		await commonPage.waitForElementDisplayed(page, srvProcessorsEl.processorExchangeHistoryData())
		await page.click(srvProcessorsEl.processorExchangeHistoryDateFilter())
	}
}

module.exports = new SrvProcessorsPage;
