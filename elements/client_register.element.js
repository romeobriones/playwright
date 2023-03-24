class clientRegisterEl {

    countryCode() { return '.item-cover .button-inner >> nth=0' }
    countrySelectModal() { return '.button-inner .alert-radio-icon' }
    countryCodeSelected(i) { return  `.button-inner .alert-radio-icon >> nth=${i}` }
    OkBtnModal() { return '.alert-button >> nth=1'}
    CancelBtnModal() { return '.alert-button >> nth=0'}
    phoneNumTxt() { return '.text-input[name="phone"]' }
    nextBtn() { return '.white-button .button-inner' }
    password() { return '.text-input[name="pin"]' }
    passwordConfirm() { return '.input-wrapper input[name="confirmPin"]' }
    fullNameTxt() { return '.text-input[name="userName"]' }
    emailTxt() { return '.text-input[name="email"]'}
    agreeTermsRadioBtn() { return '.agree-terms' }
    sex() { return '.item-cover .button-inner >> nth=3' }
    femaleRadioBtnModal() { return '.button-inner .alert-radio-icon >> nth=0' }
    maleRadioBtnModal() { return '.button-inner .alert-radio-icon >> nth=1' }
    gender() { return '.button-inner .alert-radio-icon' }
    yesBtnModal() { return '.alert-button >> nth=0'}
    headerText() { return '.header-text' }
    checkIcon() { return '.checkmark-icon' }
    closeIcon() { return '.close-icon' }
    smsCodeModalTxt() { return '.alert-input-wrapper .alert-input'}
    nextBtnSliderFirst() { return '.slides-navigation.row .button-inner' }
    nextBtnSlider() { return '.slides-navigation.row .button-inner >> nth=1' }
    headerName() { return '.toolbar-content .ellipsis' }
    avatarCircle() { return '.avatar-circle' }
    menuRegister(i) { return `.members-title >> nth=${i}`}
    btnSignUp() { return '.sign-up-button'}
    videoSkip() { return '.skip-icon' }
    header(i) { return `.toolbar-title >> nth=${i}` }
    btnBecomeCollector() { return '.create-button' }
    txtFirstName() { return 'input[name="firstName"]' }
    txtLastName() { return 'input[name="lastName"]' }
    modalSelectCountry(i) { return `.button-inner .alert-radio-icon >> nth=${i}` }
    dDownCountryCode() { return '.item-inner .item-cover .button-inner >> nth=0' }
    modalBtn(i) { return `.alert-button >> nth=${i}`}
    txtPhoneNumber() { return 'input[name="phone"]' }
    dDownGender() { return '.item-inner .item-cover .button-inner >> nth=1' }
    modalSelectGender(i) { return `.button-inner .alert-radio-icon >> nth=${i}` }
    birthDate() { return '.birth-date' }
    modalCalValue(i) { return `div.picker-opts .picker-opt >> nth=${i}`}
    modalCalBtn(i) { return `.picker-toolbar-button >> nth=${i}` }
    password(i) { return `input[type="password"] >> nth=${i}`}
    chkAgree() { return 'ion-checkbox.checkbox-square' }
    btnCheck() { return '.button[type="submit"] .check-icon' }
    btnSkipVerifyPhone() { return '.skip-button' }
}

module.exports = new clientRegisterEl;
