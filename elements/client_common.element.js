class clientCommonEl {

    createOneNow() { return 'span u' }
    headerText() { return '.header-text >> nth=0'}
    btnLogin() { return '.white-button[type="submit"]' }
    txtUsername() { return '.text-input[name="phone"]' }
    txtPassword() { return '.text-input[name="password"]' }
    btnLogon() { return '.log-in-button' }
    avatarCircle() { return '.avatar-circle' }
    menuBurger() { return '.bar-button-menutoggle' }
    menuCreateBusiness() { return '.menu-list .item-block >> nth=1' }
    menuNearby() { return '.menu-list .item-block >> nth=2' }
    menuFeedback() { return '.menu-list .item-block >> nth=3' }
    menuSettings() { return '.menu-list .item-block >> nth=4' }
    menuAbout() { return '.menu-list .item-block >> nth=5' }
    menuLogout() { return '.menu-list .item-block >> nth=6' }
    menuMember(i) { return `.menu-list .item-block >> nth=${i}` }
    checkBoxesAll() { return `.checkbox-icon`}
    checkBoxes(i) { return `ion-checkbox >> nth=${i}` }
    btnSignUp() { return '.sign-up-button' }
    btnLogin() { return '.white-button' }
    btnWebLogin() { return '//*[text()=" Log in "]' }
    videoSkip() { return '.skip-icon' }
    headerBecomeMember() { return '.toolbar-title' }
    iconBell() { return '.icon[aria-label="notification tab"]' }
    menuHamburger(i) { return `.bar-button-menutoggle >> nth=${i}` }
    header() { return '.toolbar-title' }
    subMenuSettings(i) { return `.border-bottom .label-md >> nth=${i}` }
    modalBtn(i) { return `.alert-button >> nth=${i}`}
    modalLanguage() { return '.alert-title' }
    modalLanguages(i) { return `.alert-radio-label >> nth=${i}`}
    menuItem(i){ return `.menu-item-name >> nth=${i}` }

}

module.exports = new clientCommonEl;
