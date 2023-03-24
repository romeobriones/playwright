 class clientBranchEl {

    bRecyclingBusiness() { return '.scroll-content .recycling' } 
    bTypeRecyclingBusiness(i) { return `.scroll-content .store-box >> nth=${i}`}
    btnCreateBusiness() { return '.create-button' }
    checkBoxesAll() { return `.checkbox-icon`}
    checkBoxes(i) { return `ion-checkbox >> nth=${i}` }
    name() { return 'input[name="name"]' }
    email() { return 'input[name="email"]' }
    location() { return 'input[name="location"]' }
    btnSave() { return '.bar-buttons .bar-button-default' }
    btnUpper(i) { return `.bar-buttons .bar-button-default >> nth=${i}` }
    modalBtnOK(i) { return `.alert-button >> nth=${i}` }
    modalRadioQuestion(i) { return  `.button-inner .alert-radio-icon >> nth=${i}` }
    btnDone() { return '.confirm-button' }
    storeItem() { return 'input[name="itemName"]' }
    storeItemPrice() { return 'input[name="priceUSD"]' }
    storeItemAmount() { return 'input[name="stock"]' }
    btnGreen() { return '.green-button' }
    btnRegisterMember() { return '.register-container' }
    headerCreateNewMember() { return '.finder-page-title .toolbar-title' }
    txtFullname() { return 'input[placeholder="Full Name (at least 2 symbols)"]' }
    dDownCountryCoud() { return '.input-wrapper .select-icon' }
    txtPhone() { return '.phone-input input[name="phone"]' }
    txtEmail() { return 'input[name="email"]' }
    btnNext() { return '.white-button' }
    btnFinish() { return '.white-button .button-inner' }
    dDownGender(i) { return `.select >> nth=${i}` }
    modalSelectGender(i) { return `.button-inner .alert-radio-icon >> nth=${i}` }
    modalBtnConfirm(i) { return `.alert-button >> nth=${i}`}
    txtPassword(i) { return `input[type="password"] >> nth=${i}`}
    iconAvatar() { return '.circle-image' }
    successMemAddedMsg() { return '.mleftauto' }
    xIconMemAdded() { return '.green-navbar.header .bar-button' }
    brMemberPhone(i) { return `.phone.element-flex.row >> nth=${i}` }
    btnBrExchange(i) { return `.exchange-confirm-button >> nth=${i}` }
    btnWeighScale(i) { return `.weight-item >> nth=${i}` }
    txtKgValue() { return '.text-input[name="amount"]' }
    txtSearchPhone() { return '.search-container .text-input[name="phone"]' }
    btnSearch() { return '.search-button' }
    lblItemName(i) { return `.item-name >> nth=${i}`}
    tabAllItems(i) { return `ion-segment .segment-button >> nth=${i}` }
    lblItemNames() { return '.item-name' }
    materialProperties(i) { return `.item-cover .button-inner >> nth=${i}` }
    materialTypeLabel(i) { return `.alert-radio-label >> nth=${i}` }
    materialTypeLabels() { return '.alert-radio-label' }
    meterialTypes() { return '.alert-radio-inner' }
    materialType(i) { return `.alert-radio-inner >> nth=${i}` }
    kgVal() { return `.text-input[type="number"] >> nth=0` }
    kgInventory() { return `.text-input[type="number"] >> nth=1` }
    tabIcon(i) { return `.tab-button-icon >> nth=${i}` }
    modalInvConfirm(i) { return `[ion-button="alert-button"] .button-inner >> nth=${i}` }
    saveInv() { return '.bar-buttons .bar-button-default >> nth=1' }
    saveAdd(i) { return `ion-buttons >> nth=${i}` }
    btnBar(i) { return `.bar-buttons >> nth=${4}` }
    backBtn(i) { return `.back-button .button-inner >> nth=${i}` }
    
}

module.exports = new clientBranchEl;
