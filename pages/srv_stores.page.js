const srv_storesEl = require('../elements/srv_stores.element');
const srv_commonEl = require('../elements/srv_common.element');
const util         = require('../utils/utility');
const commonPage = require("./common.page");
const srvProcessorsEl = require("../elements/srv_processors.element");
const srvBranchesEl = require("../elements/srv_branches.element");

class SrvStoresPage {

    async verifyAreaStores() { 
        let headerText = await srv_storesEl.storeHeader().getText();

        expect(await headerText).toEqual('Stores');
        expect(await srv_storesEl.storeAddBtn().isPresent()).toBeTruthy();
    }

    async verifyAddStoreDetailsArea() {
        let headerText = await srv_storesEl.storeDetailsHeader().getText();

        expect(await headerText).toEqual('Details');
    }

    async addNewStore(memberAdded) {
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
        await srv_storesEl.storeAddBtn().click();
        await util.waitUntilNotVisible(srv_commonEl.loader());
        await this.verifyAddStoreDetailsArea();
        await util.delay();
        await srv_storesEl.storeAddBtn().click();
        await util.waitUntilPresent(srv_storesEl.storeDetailSearch());
        await srv_storesEl.storeDetailSearch().clear().sendKeys(cCode + phoneNum);
        await util.waitUntilPresent(srv_storesEl.storeDetailSearchIcon());
        await srv_storesEl.storeDetailSearchIcon().click();
        await util.waitUntilPresent(srv_storesEl.storeMemberInfo());
        await srv_storesEl.storeCreateBtnModal().click();
        await srv_storesEl.storeDetailSchedMon().click();
        await srv_storesEl.storeDetailSchedTue().click();
        await srv_storesEl.storeDetailSchedWed().click();
        await srv_storesEl.storeDetailSchedThu().click();
        await srv_storesEl.storeDetailSchedFri().click();
        await srv_storesEl.storeDetailSchedSat().click();
        await srv_storesEl.storeDetailSchedSun().click();
        await srv_storesEl.storeDetailName().clear().sendKeys(name);
        let countrySelected = await util.selectDropdownbyNum(srv_storesEl.storeDetailCountry(), nth);
        await srv_storesEl.storeDetailEmail().clear().sendKeys(email);
        await srv_storesEl.storeDetailAddressArrow().click();
        await util.waitUntilPresent(srv_storesEl.storeDetailAddressModalTxt());
        await srv_storesEl.storeDetailAddressModalTxt().clear().sendKeys(countrySelected);
        await util.delay();

        if (await srv_storesEl.storeDetailAddOptionsNone() > 0)
            await srv_storesEl.storeDetailAddOptions().click();
        else {
            await srv_storesEl.closeMapBtn().click();
            console.log("      Your attempt to add a store was not successfull\n      because " + countrySelected + " is not registered in googlemaps");

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
        await srv_storesEl.storeDetailAddressModalOKBtn().click();
        await util.delay();
        await srv_storesEl.storeCreateBtn().click();
        await util.waitUntilNotVisible(srv_commonEl.loader());

        let successfullRedirect = await browser.getCurrentUrl();

        if (await successfullRedirect == 'https://qa-admin.cognitionfoundry.io/#/admin/serviceprovider') {
            created = true;
            console.log("    √ Then a new store is added by member " + cCode + phoneNum + " at " + countrySelected);
        }
        else {
            created = false;
            console.log("      Your attempt to add a store was not successfull!");
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
    
    async verifyPageLoaded(page, expect) {
        let textSlug = "/admin/serviceprovider";
        await commonPage.waitForElementDisplayed(page, srv_storesEl.panelTitle())
        await commonPage.waitForElementDisplayed(page, srv_storesEl.storeAddBtn(), 10)
        await commonPage.waitForElementNotDisplayed(page, srv_storesEl.storeTableLoader(), 10)
        await expect(page.url()).toContain(textSlug);
    }
    
    async clickStoreEntryByIndex (page, index) {
        let locator = `(${srv_storesEl.storeTableData()})[${index + 1}]`
        await commonPage.waitForElementDisplayed(page, locator)
        await page.click(locator)
    }
    
    async clickTokenSortDesc(page) {
        await page.click(srv_storesEl.tokenColumnOrder())
        await commonPage.waitForElementNotDisplayed(page, srv_storesEl.storeTableLoader(), 10)
        await page.click(srv_storesEl.tokenColumnOrder())
        await commonPage.waitForElementNotDisplayed(page, srv_storesEl.storeTableLoader(), 10)
    }
    
    async clickExchangeHistory (page) {
        await commonPage.waitForElementDisplayed(page, srv_storesEl.storeExchangeHistoryTab())
        await page.click(srv_storesEl.storeExchangeHistoryTab())
    }
    
    async waitForExchangeHistoryDataToLoad (page) {
        await commonPage.waitForElementDisplayed(page, srv_storesEl.storeExchangeHistoryData())
    }
    
    async setExchangeHistoryDateFilter (page, dateData) {
        await this.clickExchangeHistoryDateFilter(page)
        await this.setExchangeHistoryPickerDate(page, dateData.startDate)
        await this.setExchangeHistoryPickerDate(page, dateData.endDate)
    }
    
    async setExchangeHistoryPickerDate(page, date) {
        console.log(`Executing setBranchesTransactionHistoryEndDate(${date})`)
        let arrEndDate = date.split('-')
        let dayLocator = `${srv_storesEl.storeExchangeHistoryDatePickerDay()}//*[text()=" ${parseInt(arrEndDate[2])} "]`
        await commonPage.selectDropdownByValue(page, srv_storesEl.storeExchangeHistoryDatePickerYear(), `${parseInt(arrEndDate[0])}`)
        await commonPage.selectDropdownByValue(page, srv_storesEl.storeExchangeHistoryDatePickerMonth(), `${parseInt(arrEndDate[1])}`)
        await page.click(dayLocator)
    }
    
    async clickExchangeHistoryDateFilter (page) {
        await commonPage.waitForElementDisplayed(page, srv_storesEl.storeExchangeHistoryData())
        await page.click(srv_storesEl.storeExchangeHistoryDateFilter())
    }
    
    async clickStoreExchangeHistoryExport (page) {
        console.log('Executing clickStoreExchangeHistoryExport()')
        await page.click(srv_storesEl.storeExchangeHistoryExportButton())
    }
}

module.exports = new SrvStoresPage;
