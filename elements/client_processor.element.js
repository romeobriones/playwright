class clientProcessorEl {

    bRecyclingBusiness() { return '.scroll-content .recycling' } 
    bTypeProcessor() { return '.scroll-content .store-box >> nth=7'}
    btnCreateBusiness() { return '.create-button' }
    checkBoxesAll() { return `.checkbox-icon`}
    checkBoxes(i) { return `ion-checkbox >> nth=${i}` }
    name() { return 'input[name="name"]' }
    location() { return 'input[name="location"]' }
    email() { return 'input[name="email"]' }
    btnSave() { return '.bar-buttons .bar-button-default' }
    modalBtnOK(i) { return `.alert-button >> nth=${i}` }
    modalRadioQuestion(i) { return  `.button-inner .alert-radio-icon >> nth=${i}` }
    btnDone() { return '.confirm-button' }
    txtFullname() { return 'input[placeholder="Full Name (at least 2 symbols)"]' }
    dDownCountryCoud() { return '.input-wrapper .select-icon' }
    txtPhone() { return '.phone-input input[name="phone"]' }
    txtEmail() { return 'input[name="email"]' }
    btnNext() { return '.white-button' }
    btnFinish() { return '.white-button .button-inner' }
    dDownGender(i) { return `.select >> nth=${i}` }
    modalSelectGender(i) { return `.button-inner .alert-radio-icon >> nth=${i}` }
    modalBtn(i) { return `.alert-button >> nth=${i}`}
    txtPassword(i) { return `input[type="password"] >> nth=${i}`}
    iconAvatar() { return '.circle-image' }
    successMemAddedMsg() { return '.mleftauto' }
    xIconMemAdded() { return '.green-navbar.header .bar-button' }
    btnRegisterMember() { return '.register-container' }
    headerCreateNewMember() { return '.finder-page-title .toolbar-title' }
    prMemberPhone(i) { return `.phone.element-flex.row >> nth=${i}` }
    btnBrExchange(i) { return `.exchange-confirm-button >> nth=${i}` }
    btnWeighScale(i) { return `.weight-item >> nth=${i}` }
    txtKgValue() { return '.text-input[name="amount"]' }
    txtSearchPhone() { return 'ion-input [name="phone"]' }
    btnSearch() { return '.search-button' }
    tabAllItems(i) { return `ion-segment .segment-button >> nth=${i}` }
    lblItemName(i) { return `.item-name >> nth=${i}`}
    lblItemNames() {  return '.item-name' }
    materialProperties(i) { return `.item-cover .button-inner >> nth=${i}` }
    modalInvConfirm(i) { return `[ion-button="alert-button"] .button-inner >> nth=${i}` }
    meterialTypes() { return '.alert-radio-inner' }
    backBtn(i) { return `.back-button .button-inner >> nth=${i}` }
    materialTypeLabel(i) { return `.alert-radio-label >> nth=${i}` }
    kgVal() { return `.text-input[type="number"] >> nth=0` }
    kgInventory() { return `.text-input[type="number"] >> nth=1` }
    saveAdd(i) { return `ion-buttons >> nth=${i}` }
    tabIcon(i) { return `.tab-button-icon >> nth=${i}` }

}

module.exports = new clientProcessorEl;
