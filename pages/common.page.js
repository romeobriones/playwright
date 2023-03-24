const { expect } = require('@playwright/test');
const clientCommonEl     = require('../elements/client_common.element');
const clientRegisterPage = require('../elements/client_register.element');
const util               = require('./../utils/utility');

class CommonPage {

  async waitForElementDisplayed (page, locator, retries = 5, exitSilently = false) {
    console.log(`Executing waitForElementDisplayed(${locator}, ${retries})`)
    try {
      await page.waitForSelector(locator, { timeout: 6000 })
      return true
    } catch (e) {
      if (retries > 0) {
        await util.delay(6000)
        return this.waitForElementDisplayed(page, locator, retries - 1, exitSilently)
      }
      else {
        if (exitSilently) return false
        else throw new Error(`Element ${locator} is not found after max retries.`)
      }
    }
  }

  async waitForElementNotDisplayed (page, locator, retries = 20, exitSilently = false) {
    console.log(`Executing waitForElementNotDisplayed(${locator}, ${retries})`)
    try {
      let isDisplayed = await this.waitForElementDisplayed(page, locator, 0, true)
      console.log(`isDisplayed: ${isDisplayed}`)
      if (isDisplayed) throw new Error()
      else return true
    } catch (e) {
      if (retries > 0) {
        await util.delay(6000)
        return this.waitForElementNotDisplayed(page, locator, retries - 1, exitSilently)
      } else {
        if (exitSilently) return false
        else throw new Error(`Element ${locator} is not found after max retries.`)
      }
    }
  }

  async selectDropDownByText (page, locator, textValue) {
    const optionToSelect = await page.locator('option', { hasText: textValue }).textContent()
    await page.locator(locator).selectOption({ label: optionToSelect })
  }

  async selectDropdownByValue (page, locator, value) {
    console.log(`Executing selectDropdownByValue(${locator}, ${value})`)
    await page.locator(locator).selectOption(value)
  }
  
  async scrollIntoView (page, locator) {
    await page.locator(locator).scrollIntoViewIfNeeded()
  }
}

module.exports = new CommonPage;
