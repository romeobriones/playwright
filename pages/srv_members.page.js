const srv_membersEl = require('../elements/srv_members.element');
const srv_commonEl  = require('../elements/srv_common.element');
const util          = require('../utils/utility');
const commonPage = require("./common.page");
const srvCommonEl = require("../elements/srv_common.element");
const srv_commonPage = require("./srv_common.page");
const srvOrdersEl = require("../elements/srv_orders.element");
const srvBranchesEl = require("../elements/srv_branches.element");

class SrvMembersPage {
	
	async verifyMembersArea(page, expect) {
		console.log(`Executing verifyMembersArea()`)
		let textSlug = "/admin/finder";
		await commonPage.waitForElementDisplayed(page, srv_membersEl.memberHeader())
		await commonPage.waitForElementNotDisplayed(page, srv_membersEl.memberTableLoader(), 30)
		await expect(page.url()).toContain(textSlug);
	}
	
	async getTableHeader (page) {
		return srv_commonPage.getReportChartHeader(page, srv_membersEl.tableHeader())
	}
	
	async verifyAddMemberDetailsArea() {
		let headerText = await srv_membersEl.memberDetailsHeader().getText();
		
		expect(await headerText).toEqual('Details')
		expect(await srv_membersEl.memberDetailPhone()).toBeTruthy();
		expect(await srv_membersEl.memberDetailName()).toBeTruthy();
	}
	
	async addNewMember(countries) {
		let brType;
		let created;
		let userRole;
		
		let phoneNum  = util.getRandomMobileNumber();
		
		let name   = countries.name + util.getCurrentTimestamp();
		let city   = countries.city;
		let passwd = countries.passwd;
		let nth    = countries.nth;
		
		if (countries.branchType)
			brType = countries.branchType;
		else
			brType = 0;
		
		if (countries.userRole)
			userRole = countries.userRole;
		else
			userRole = 0;
		
		await util.waitUntilNotVisible(srv_commonEl.loader());
		await srv_membersEl.memberAddBtn().click();
		await util.delay();
		await this.verifyAddMemberDetailsArea();
		
		let cCode = await util.selectDropdownbyNum(srv_membersEl.memberDetailCountriesId(), nth);
		cCode = await cCode.split(' ')[0].slice(1, -1);
		let countrySelected = await util.selectDropdownbyNum(srv_membersEl.memberDetailCountries(), nth);
		await srv_membersEl.memberDetailPhone().clear().sendKeys(phoneNum);
		await srv_membersEl.memberDetailName().clear().sendKeys(name);
		await srv_membersEl.memberDetailCity().clear().sendKeys(city);
		await srv_membersEl.memberDetailPassword().clear().sendKeys(passwd);
		await srv_membersEl.memberDetailEmail().clear().sendKeys(phoneNum + '@plasticBank.com');
		await util.selectRandomVal(srv_membersEl.memberDetailGenders());
		await srv_membersEl.memberDetailDOB().click();
		await srv_membersEl.memberDetailBday().click();
		await srv_membersEl.memberCreateBtn().click();
		await util.waitUntilNotVisible(srv_commonEl.loader());
		
		let redirectUrl = await browser.getCurrentUrl();
		
		if (redirectUrl == 'https://qa-admin.cognitionfoundry.io/#/admin/finder') {
			created = true;
			console.log("    √ Then a new member is added with phone numnber " + cCode + phoneNum + " from", countrySelected);
		} else {
			created = false;
			console.log("      Your attempt to add a user was not successfull!\n      probably because " + cCode + phoneNum + "already exist!");
		}
		
		return {
			name        : name,
			city        : city,
			cCode       : cCode,
			phoneNum    : phoneNum,
			country     : countrySelected,
			nth         : nth,
			email       : phoneNum + '@plasticBank.com',
			created     : created,
			branchType  : brType,
			userRole    : userRole
		};
	}
	
	async clickMembersExport (page) {
		await page.click(srv_membersEl.membersExportButton())
	}
	
	async setExchangeHistoryDateFilter (page, dateData) {
		console.log(`Executing setExchangeHistoryDateFilter()`)
		await this.clickExchangeHistoryDateFilter(page)
		await this.setExchangeHistoryPickerDate(page, dateData.startDate)
		await this.setExchangeHistoryPickerDate(page, dateData.endDate)
		await commonPage.waitForElementNotDisplayed(page, srv_membersEl.memberTableLoader(), 15)
	}
	
	async setExchangeHistoryPickerDate(page, date) {
		console.log(`Executing setExchangeHistoryPickerDate(${date})`)
		let arrEndDate = date.split('-')
		let dayLocator = `${srv_membersEl.memberDatePickerDay()}//*[text()=" ${parseInt(arrEndDate[2])} "]`
		await commonPage.selectDropdownByValue(page, srv_membersEl.memberDatePickerYear(), `${parseInt(arrEndDate[0])}`)
		await commonPage.selectDropdownByValue(page, srv_membersEl.memberDatePickerMonth(), `${parseInt(arrEndDate[1])}`)
		await page.click(dayLocator)
	}
	
	async clickExchangeHistoryDateFilter (page) {
		console.log(`Executing clickExchangeHistoryDateFilter()`)
		await commonPage.waitForElementNotDisplayed(page, srv_membersEl.memberTableLoader())
		await page.click(srv_membersEl.memberDateFilter())
	}
}

module.exports = new SrvMembersPage;
