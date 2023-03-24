const { expect } = require('@playwright/test');
const clientCommonEl     = require('../elements/client_common.element');
const clientRegisterPage = require('../elements/client_register.element');
const util               = require('./../utils/utility');

class CommonClient {

  async verifyLandingPage(expect) {
    await expect(clientCommonEl.btnSignUp).toBeTruthy();
    await expect(clientCommonEl.btnLogin()).toBeTruthy();
  }

  async verifyWebLandingPage(expect) {
    await expect(clientCommonEl.btnWebLogin()).toBeTruthy();
  }
  async loginNewlyCreated(page) {
    await page.fill(clientCommonEl.txtPassword(), "555555");
    await page.click(clientCommonEl.btnLogin());
  }

  async clickSignUp(page) {
    await util.delay();
    await page.click(clientCommonEl.btnSignUp());
    await page.click(clientCommonEl.videoSkip());
  }

  async verifyBecomeMember(page, expect) {
    let header = await page.locator(clientCommonEl.headerBecomeMember());
    await expect(header).toHaveText('Become a member');

    for(let i=0; i < 4; i++)
      await expect(clientRegisterPage.menuRegister(i)).toBeTruthy();
  }

  async logOff(page) {
    await page.click(clientCommonEl.menuBurger());
    await page.click(clientCommonEl.menuMember(7));
    await util.delay();
  }

  async logOffBlue(page) {
    if (clientCommonEl.menuHamburger(1))
      await page.click(clientCommonEl.menuHamburger(1));
    else
      await page.click(clientCommonEl.menuBurger());

    await page.click(clientCommonEl.menuMember(7));
    await util.delay();
  }

  async logOffCollector(page) {
    await page.click(clientCommonEl.menuBurger());
    await page.click(clientCommonEl.menuMember(5));
    await util.delay();
  }

  async logout(page) {
    await page.click(clientCommonEl.menuBurger());
    await page.click(clientCommonEl.menuLogout());
    await util.delay();
  }

  async verifyDashboard(expect) {
    await expect(clientCommonEl.menuBurger()).toBeTruthy();
  }

  async clickLogin(page) {
    await util.delay();
    await page.click(clientCommonEl.btnLogin());
  }

  async verifyLoginArea(expect) {
    await expect(clientCommonEl.txtUsername()).toBeTruthy();
    await expect(clientCommonEl.txtPassword()).toBeTruthy();
    await expect(clientCommonEl.btnLogon()).toBeTruthy();
  }

  async login(page, username, passwd) {
    await util.delay();
    await page.type(clientCommonEl.txtUsername(), username);
    await page.type(clientCommonEl.txtPassword(), passwd);
    await page.click(clientCommonEl.btnLogon());
  }

  async clickSettingsMember(page) {
    await util.delay();
    await page.click(clientCommonEl.menuBurger());
    await page.click(clientCommonEl.menuMember(5));
  }

  async clickIconBell(page) {
    await util.delay();
    await page.click(clientCommonEl.iconBell());
  }

  async logOffMember(page) {
    await page.click(clientCommonEl.menuHamburger(1));
    await page.click(clientCommonEl.menuLogout());
  }

  async verifySettingsArea(page, expect) {
    let header = await page.locator(clientCommonEl.header());
    await expect(header).toHaveText('Settings');
  }

  async clickDeleteAccount(page) {
    await page.click(clientCommonEl.subMenuSettings(5));
    await page.click(clientCommonEl.modalBtn(0));
    await util.delay();
  }

  async clickMenuBurger(page) {
    await page.click(clientCommonEl.menuBurger());
  }

  async verifyMenuHelp(page, expect) {
    let menuTxt = await page.locator(clientCommonEl.menuMember(3));
    await expect(menuTxt).toHaveText('Help');
  }

  async clickHelpMember(page) {
    await page.click(clientCommonEl.menuMember(3));
  }

  async verifyHelpUrl(page, expect) {
    let url = await page.url();
    await expect(url).toBe('https://help.plasticbank.com/');
  }

  async clickMenuLogout(page) {
    await page.click(clientCommonEl.menuLogout());
  }

  async clickLanguageMember(page) {
    await page.click(clientCommonEl.menuMember(5));
  }

  async verifyLanguages(page, expect) {
    let headerText = await page.locator(clientCommonEl.modalLanguage());
    await expect(headerText).toBe('Language');
  }

  async clickEachLangauge(page, expect) {

  }

  async verifySelectedLanguage(expect) {

  }

}

module.exports = new CommonClient;
