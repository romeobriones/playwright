class SrvMembersEl {

    memberAddBtn() { return '.pb-add-button' }
    memberHeader() { return '.col-3' }
    tableHeader() { return '//thead//th' }
    memberTableData() { return '//tbody//tr' }
    memberTableLoader() { return '//*[text()="Loading..." ]|//ngx-skeleton-loader' }
    membersExportButton() { return '//*[text()="Export"]' }
    memberDetailsHeader() { return '.panel-title.d-flex.border-bottom.p-4' }
    memberDetailCountries() { return '.pb-select[name="country"]' }
    memberDetailCountriesId() { return '.pb-select[name="countryid"]' }
    memberDetailCountryCode() { return '.pb-select[name="countryid"]' }
    memberDetailCountriesCount() { return '.pb-select[name="countryid"]' }
    memberDetailPhone() { return '#phone' }
    memberDetailName() { return '#name' }
    memberDetailCity() { return '#city' }
    memberDetailPassword() { return '#pin' }
    memberDetailDOB() { return '#birthDate' }
    memberDetailBday() { return '.btn-light.ng-star-inserted >> nth=0' }
    memberDetailEmail() { return '#email' }
    memberDetailGenders() { return '#gender option' }
    memberCreateBtn() { return '.pb-button.green' }
    modalCloseBtn() { return '.btn-outline-dark ' }
    memberDateFilter() { return '(//*[@class="daterange-container"]/span)[1]' }
    memberDatePickerDay() { return '//ngb-datepicker-month' }
    memberDatePickerYear() { return '(//ngb-datepicker-navigation-select//select)[2]' }
    memberDatePickerMonth() { return '(//ngb-datepicker-navigation-select//select)[1]' }

}

module.exports = new SrvMembersEl;
