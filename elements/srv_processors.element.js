class SrvProcessorsEl {
    panelTitle() { return '(//*[text()="Processors"])[2]' }
    processorAddBtn() { return '.pb-add-button' }
    processorTableData() { return '//table//tbody//tr' }
    processorTableLoader() { return '//*[text()="Loading..."]' }
    processorDetailSearch() { return '[placeholder="Search"]' }
    processorDetailSearchIcon() { return '[class="search-icon"]' }
    processorCreateBtnModal() { return '.pb-button.green.w-75' }
    processorHeader() { return '.panel-title.p-3.col-2' }
    processorDetailsHeader() { return '.panel-title.d-flex.border-bottom.p-4' }
    processorCreateBtn() { return '.pb-button.green' }
    modalCloseBtn() { return '.btn-outline-dark ' }
    processorDetailName() { return '#name' }
    processorDetailCountry() { return '#country' }
    processorDetailEmail() { return '#email' }
    processorDetailAddress() { return '.mb-3.w-100[name="address"]' }
    processorDetailAddressArrow() { return '.fa-location-arrow' }
    processorDetailAddressModalTxt() { return '.modal-body [name="address"]' }
    processorDetailAddOptions() { return '.pl-3.pt-2.pb-2 >> nth=0' }
    processorDetailAddOptionsNone() { return '.pl-3.pt-2.pb-2' }
    processorDetailAddressModalOKBtn() { return '.pb-button.green.w-100' }
    closeMapBtn() { return '.ml-auto.pointer.close' }
    processorDetailSchedMon() { return '.d-flex.mb-2 [type="checkbox"] >> nth=0' }
    processorDetailSchedTue() { return '.d-flex.mb-2 [type="checkbox"] >> nth=1' }
    processorDetailSchedWed() { return '.d-flex.mb-2 [type="checkbox"] nth=2' }
    processorDetailSchedThu() { return '.d-flex.mb-2 [type="checkbox"] nth=3' }
    processorDetailSchedFri() { return '.d-flex.mb-2 [type="checkbox"] >> nth=4' }
    processorDetailSchedSat() { return '.d-flex.mb-2 [type="checkbox"] >> nth=5' }
    processorDetailSchedSun() { return '.d-flex.mb-2 [type="checkbox"] nth=6' }
    processorMemberInfo() { return '.circle-image.small.mb-2.default-avatar' }
    processorExchangeHistoryTab() { return '//*[text()="Exchange History"]' }
    processorExchangeHistoryExportButton() { return '//*[text()="Export"]' }
    processorExchangeHistoryDateFilter() { return '(//*[text()="DATE RANGE"]/following-sibling::datepicker-range/div/span)[1]' }
    processorExchangeHistoryDatePickerDay() { return '//ngb-datepicker-month' }
    processorExchangeHistoryDatePickerYear() { return '(//ngb-datepicker-navigation-select//select)[2]' }
    processorExchangeHistoryDatePickerMonth() { return '(//ngb-datepicker-navigation-select//select)[1]' }
    processorExchangeHistoryData() { return '//*[@role="tablist"]//*[contains(@class, "card-header")]' }
}

module.exports = new SrvProcessorsEl;
