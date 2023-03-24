const srvBranchesEl = require( '../elements/srv_branches.element' );
const srv_commonEl  = require( '../elements/srv_common.element' );
const util          = require( '../utils/utility' );
const commonPage = require("./common.page");
const srv_commonPage = require('../pages/srv_common.page');
const srvCommonEl = require("../elements/srv_common.element");

class SrvBranchesPage {
	
	async verifyAreaBranches(page, expect) {
		let headerText = await page.locator(srvBranchesEl.branchHeader()).innerText();
		
		expect(headerText).toEqual('Branches');
	}
	
	async verifyAddBranchDetailsArea() {
		let headerText = await srvBranchesEl.branchDetailsHeader().getText();
		
		expect( await headerText ).toEqual( 'Details' )
		expect( await srvBranchesEl.branchDetailPhone() ).toBeTruthy();
		expect( await srvBranchesEl.branchDetailName() ).toBeTruthy();
	}
	
	async addNewBranch( memberAdded ) {
		let name      = memberAdded.name;
		let cCode     = memberAdded.cCode;
		let phoneNum  = memberAdded.phoneNum;
		let nth       = memberAdded.nth;
		let email     = memberAdded.email;
		let nthBType  = memberAdded.branchType;
		let created   = memberAdded.created;
		
		if( created == false )
			return {
				name     : name,
				cCode    : cCode,
				phoneNum : phoneNum,
				country  : countrySelected,
				nth      : nth,
				email    : email,
				created  : false
			}
		
		await util.waitUntilNotVisible( srv_commonEl.loader() );
		await srvBranchesEl.branchAddBtn().click();
		await util.waitUntilNotVisible( srv_commonEl.loader() );
		await this.verifyAddBranchDetailsArea();
		await util.delay();
		
		let branchType = await util.selectDropdownbyNum( srvBranchesEl.branchDetailType(), nthBType );
		await srvBranchesEl.branchAddBtn().click();
		await util.waitUntilPresent( srvBranchesEl.branchDetailSearch() );
		await srvBranchesEl.branchDetailSearch().clear().sendKeys( cCode + phoneNum );
		await util.waitUntilPresent( srvBranchesEl.branchDetailSearchIcon() );
		await srvBranchesEl.branchDetailSearchIcon().click();
		await util.waitUntilPresent( srvBranchesEl.branchMemberInfo() );
		await srvBranchesEl.branchCreateBtnModal().click();
		await srvBranchesEl.branchDetailSchedMon().click();
		await srvBranchesEl.branchDetailSchedTue().click();
		await srvBranchesEl.branchDetailSchedWed().click();
		await srvBranchesEl.branchDetailSchedThu().click();
		await srvBranchesEl.branchDetailSchedFri().click();
		await srvBranchesEl.branchDetailSchedSat().click();
		await srvBranchesEl.branchDetailSchedSun().click();
		await srvBranchesEl.branchDetailName().clear().sendKeys( name );
		let countrySelected = await util.selectDropdownbyNum( srvBranchesEl.branchDetailCountry(), nth );
		await srvBranchesEl.branchDetailEmail().clear().sendKeys( email );
		await srvBranchesEl.branchDetailAddressArrow().click();
		await util.waitUntilPresent( srvBranchesEl.branchDetailAddressModalTxt() );
		await srvBranchesEl.branchDetailAddressModalTxt().clear().sendKeys( countrySelected );
		await util.delay();
		
		if ( await srvBranchesEl.branchDetailAddOptionsNone() > 0 )
			await srvBranchesEl.branchDetailAddOptions().click();
		else {
			await srvBranchesEl.closeMapBtn().click();
			console.log( "      Your attempt to add a branch was not successfull\n      because " + countrySelected + " is not registered in googlemaps" );
			
			return {
				name        : name,
				cCode       : cCode,
				phoneNum    : phoneNum,
				country     : countrySelected,
				nth         : nth,
				email       : email,
				created     : false,
				branchType  : branchType
			}
		}
		
		await util.delay();
		await srvBranchesEl.branchDetailAddressModalOKBtn().click();
		await util.delay();
		await srvBranchesEl.branchCreateBtn().click();
		await util.waitUntilNotVisible( srv_commonEl.loader() );
		
		let successfullRedirect = await browser.getCurrentUrl();
		
		if ( await successfullRedirect == 'https://qa-admin.cognitionfoundry.io/#/admin/collectionpoint' ) {
			created = true;
			console.log( "    √ Then a new " + branchType + " branch is added by member " + cCode + phoneNum + " at " + countrySelected );
		}
		else {
			created = false;
			console.log( "      Your attempt to add a branch was not successfull!\n" );
		}
		
		return {
			name        : name,
			cCode       : cCode,
			phoneNum    : phoneNum,
			country     : countrySelected,
			nth         : nth,
			email       : email,
			created     : created,
			branchType  : branchType
		}
	}
	
	async selectBranchPhone(page, branchPhone) {
		await util.delay(30000);
		await page.type(srvBranchesEl.branchNamePhoneTxt(), branchPhone);
		await util.delay();
		await page.click(srvBranchesEl.branchNameRecordFirst());
	}
	
	async verifyBranchDetails(page, expect) {
		let detailsTabTxt       = await page.locator(srvBranchesEl.branchDetailsTab()).innerText();
		let exchangeHitstoryTxt = await page.locator(srvBranchesEl.branchExchangeHistoryTab()).innerText();
		
		expect(detailsTabTxt).toEqual('Details');
		expect(exchangeHitstoryTxt).toEqual('Exchange History');
	}
	
	async clickInventoryTab(page) {
		await page.click(srvBranchesEl.tabBranchDetails(2));
		await util.delay();
	}

	async clickAllEligibleForBonus (page) {
    let locator = `//tbody//tr//td[2]`
    let elements = await page.$$(locator)
    for (let index in elements) {
      let locator = `(//tbody//tr//td[2])[${parseInt(index) + 1}]//mdl-checkbox`
      await commonPage.waitForElementDisplayed(page, locator)
      let className = await page.locator(locator).getAttribute('class')
      if (!className.includes('is-checked')){
        await elements[index].click()
      }
    }
	}
	
	async verifyInventoryCash(page, expect) {
		let value = await page.locator(srvBranchesEl.tdBranchCash(98)).innerText();
		
		expect(value).toContain('0.00');
	}
	
	async verifyPageLoaded(page, expect) {
		let textSlug = "/admin/collectionpoint";
		await commonPage.waitForElementDisplayed(page, srvBranchesEl.panelTitle())
		await commonPage.waitForElementDisplayed(page, srvBranchesEl.branchAddBtn())
		await commonPage.waitForElementNotDisplayed(page, srvBranchesEl.branchTableLoader(), 10)
		await expect(page.url()).toContain(textSlug);
	}
	
	async searchBranchName(page, branchName) {
		await page.click(srvBranchesEl.branchNameSearchTxt())
		await page.type(srvBranchesEl.branchNameSearchTxt(), branchName)
		let locator = `(//tbody//tr)[1]//*[contains(text(), "${branchName}")]`
		await commonPage.waitForElementDisplayed(page, locator)
		await page.click(locator)
	}
	
	async clickBranchEntryByIndex (page, index) {
		let locator = `(//tbody//tr)[${index + 1}]`
		await commonPage.waitForElementDisplayed(page, locator)
		await page.click(locator)
	}
	
	async clickExchangeHistory (page) {
		await commonPage.waitForElementDisplayed(page, srvBranchesEl.branchExchangeHistoryTab())
		await page.click(srvBranchesEl.branchExchangeHistoryTab())
	}
	
	async waitForExchangeHistoryDataToLoad (page) {
		await commonPage.waitForElementDisplayed(page, srvBranchesEl.branchExchangeHistoryData())
	}
	
	async clickBranchesExchangeHistoryExport (page) {
		await page.click(srvBranchesEl.branchExchangeHistoryExportButton())
	}
	
	async getBranchesExchangeHistoryTableHeader (page) {
		return srv_commonPage.getReportChartHeader(page, srvBranchesEl.branchTableLoader())
	}
	
	async setExchangeHistoryDateFilter (page, dateData) {
		await this.clickExchangeHistoryDateFilter(page)
		await this.setExchangeHistoryPickerDate(page, dateData.startDate)
		await this.setExchangeHistoryPickerDate(page, dateData.endDate)
	}
	
	async setExchangeHistoryPickerDate(page, date) {
		console.log(`Executing setBranchesTransactionHistoryEndDate(${date})`)
		let arrEndDate = date.split('-')
		let dayLocator = `${srvBranchesEl.branchExchangeHistoryDatePickerDay()}//*[text()=" ${parseInt(arrEndDate[2])} "]`
		await commonPage.selectDropdownByValue(page, srvBranchesEl.branchExchangeHistoryDatePickerYear(), `${parseInt(arrEndDate[0])}`)
		await commonPage.selectDropdownByValue(page, srvBranchesEl.branchExchangeHistoryDatePickerMonth(), `${parseInt(arrEndDate[1])}`)
		await page.click(dayLocator)
	}
	
	async clickExchangeHistoryDateFilter (page) {
		await commonPage.waitForElementDisplayed(page, srvBranchesEl.branchExchangeHistoryData())
		await page.click(srvBranchesEl.branchExchangeHistoryDateFilter())
	}

}

module.exports = new SrvBranchesPage;
