class SrvStoresEl {
    panelTitle() { return '(//*[text()=" Stores "])[2]' }
    storeAddBtn() { return '.pb-add-button' }
    storeTableLoader() { return '//*[text()="Loading..."]' }
    storeTableData() { return '//table//tbody//tr' }
    storeExchangeHistoryTab() { return '//*[text()="Exchange History"]' }
    storeExchangeHistoryExportButton() { return '//*[text()="Export"]' }
    storeExchangeHistoryDateFilter() { return '(//*[text()="DATE RANGE"]/following-sibling::datepicker-range/div/span)[1]' }
    storeExchangeHistoryDatePickerDay() { return '//ngb-datepicker-month' }
    storeExchangeHistoryDatePickerYear() { return '(//ngb-datepicker-navigation-select//select)[2]' }
    storeExchangeHistoryDatePickerMonth() { return '(//ngb-datepicker-navigation-select//select)[1]' }
    storeExchangeHistoryData() { return '//exchange-history//div[@class="ng-star-inserted"]' }
    storeDetailSearch() { return '[placeholder="Search"]' }
    storeDetailSearchIcon() { return '[class="search-icon"]' }
    storeCreateBtnModal() { return '.pb-button.green.w-75' }
    storeHeader() { return '.panel-title.p-3.col-2' }
    storeDetailsHeader() { return '.panel-title.d-flex.border-bottom.p-4' }
    storeCreateBtn() { return '.pb-button.green' }
    modalCloseBtn() { return '.btn-outline-dark ' }
    storeDetailName() { return '#name' }
    storeDetailCountry() { return '#country' }
    storeDetailEmail() { return '#email' }
    storeDetailAddress() { return '.mb-3.w-100[name="address"]' }
    storeDetailAddressArrow() { return '.fa-location-arrow' }
    storeDetailAddressModalTxt() { return '.modal-body [name="address"]' }
    storeDetailAddOptions() { return '.pl-3.pt-2.pb-2 >> nth=0' }
    storeDetailAddOptionsNone() { return '.pl-3.pt-2.pb-2' }
    storeDetailAddressModalOKBtn() { return '.pb-button.green.w-100' }
    closeMapBtn() { return '.ml-auto.pointer.close' }
    storeDetailSchedMon() { return '.d-flex.mb-2 [type="checkbox"] >> nth=0' }
    storeDetailSchedTue() { return '.d-flex.mb-2 [type="checkbox"] >> nth=1' }
    storeDetailSchedWed() { return '.d-flex.mb-2 [type="checkbox"] >> nth=2' }
    storeDetailSchedThu() { return '.d-flex.mb-2 [type="checkbox"] >> nth=3' }
    storeDetailSchedFri() { return '.d-flex.mb-2 [type="checkbox"] >> nht=4' }
    storeDetailSchedSat() { return '.d-flex.mb-2 [type="checkbox"] >> nth=5' }
    storeDetailSchedSun() { return '.d-flex.mb-2 [type="checkbox"] >> nht=6' }
    storeMemberInfo() { return '.circle-image.small.mb-2.default-avatar' }
    tokenColumnOrder() { return '//*[@placeholder="Tokens in Wallet"]/parent::div//div' }
    storeNameTableFilter() { return '//*[@placeholder="Name"]' }
}

module.exports = new SrvStoresEl;
