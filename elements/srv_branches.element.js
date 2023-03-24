class SrvBranchesEl {
    panelTitle() { return '//div[contains(@class, "panel-title")]' }
    branchNameSearchTxt() { return '.datatable-input[placeholder="Name"]' }
    branchNamePhoneTxt() { return '.datatable-input[placeholder="Phone"]' }
    branchNameRecordFirst() { return 'td .ng-star-inserted >> nth=0' }
    branchDetailsTab() { return '#ngb-nav-0' }
    branchExchangeHistoryTab() { return '//*[text()="Exchange History"]' }
    branchExchangeHistoryData() { return '//*[@role="tablist"]//*[contains(@class, "card-header")]' }
    branchExchangeHistoryExportButton() { return '//*[text()="Export"]' }
    branchExchangeHistoryDateFilter() { return '(//*[text()="DATE RANGE"]/following-sibling::datepicker-range/div/span)[1]' }
    branchExchangeHistoryDatePickerDay() { return '//ngb-datepicker-month' }
    branchExchangeHistoryDatePickerYear() { return '(//ngb-datepicker-navigation-select//select)[2]' }
    branchExchangeHistoryDatePickerMonth() { return '(//ngb-datepicker-navigation-select//select)[1]' }
    tabBranchDetails(i) { return `.nav-tabs.nav li >> nth=${i}`}
    tdBranchCash(i) { return `div .ng-star-inserted >> nth=${i}` }
    branchHeader() { return '.panel-title.p-3.col-2' }
    branchAddBtn() { return '.pb-add-button' }
    branchTableLoader() { return '//*[text()="Loading..."]' }
    branchDetailsHeader() { return '.panel-title.d-flex.border-bottom.p-4' }
    branchCreateBtn() { return '.pb-button.green' }
    branchCreateBtnModal() { return '.pb-button.green.w-75' }
    branchDetailName() { return '#name' }
    branchDetailCountry() { return '#country' }
    branchDetailCountries() { return '#country option' }
    branchDetailEmail() { return '#email' }
    branchDetailAddress() { return '.mb-3.w-100[name="address"]' }
    branchDetailAssPartner() { return '#associated-partner' }
    branchDetailCity() { return '#city' }
    branchDetailAssBrand() { return '.pb-select[name=associated-brand]' }
    branchDetailID() { return '.d-block.w-100.ng-pristine' }
    branchDetailType() { return '#branch-type' }
    branchDetailStatus() { return '#status' }
    branchDetailLeval() { return '#level' }
    branchDetailPhone() { return '#phone' }
    branchDetailDescription() { return '#description' }
    branchDetailUploadReciept() { return '.mdl-switch__thumb' }
    branchDetailShowToken() { return '.mdl-switch__focus-helper' }
    branchDetailSchedMon() { return '.d-flex.mb-2 [type="checkbox"] >> nth=0' }
    branchDetailSchedTue() { return '.d-flex.mb-2 [type="checkbox"] >> nth=0' }
    branchDetailSchedWed() { return '.d-flex.mb-2 [type="checkbox"] >> nth=2' }
    branchDetailSchedThu() { return '.d-flex.mb-2 [type="checkbox"] >> nth=3' }
    branchDetailSchedFri() { return '.d-flex.mb-2 [type="checkbox"] >> nth=4' }
    branchDetailSchedSat() { return '.d-flex.mb-2 [type="checkbox"] >> nth=5' }
    branchDetailSchedSun() { return '.d-flex.mb-2 [type="checkbox"] >> nth=6' }
    branchDetailKmShoreline() { return '#kmFromShoreline' }
    branchDetailKmOceanBound() { return '#kmFromOceanBound' }
    modalCloseBtn() { return '.btn-outline-dark ' }
    branchDetailSearch() { return '[placeholder="Search"]' }
    branchDetailSearchIcon() { return '[class="search-icon"]' }
    branchDetailAddressArrow() { return '.fa-location-arrow' }
    branchDetailAddressModalTxt() { return '.modal-body [name="address"]' }
    branchDetailAddressModalOKBtn() { return '.pb-button.green.w-100' }
    branchDetailAddressModalMap() { return '[aria-label="Map"]' }
    branchDetailAddOptions() { return '.pl-3.pt-2.pb-2 >> nth=0' }
    closeMapBtn() { return '.ml-auto.pointer.close' }
    branchDetailAddOptionsNone() { return '.pl-3.pt-2.pb-2' }
    branchMemberInfo() { return '.circle-image.small.mb-2.default-avatar' }

}

module.exports = new SrvBranchesEl;
