const fs = require('fs-extra')
const readline = require('readline')
const stream = require('stream')

class Utility {

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  delay(time = 5000) {
    console.log(`Executing delay(${time})`)
    return new Promise(resolve => { setTimeout(resolve, time) });
  }

  getRandomMobileNumber() { return Math.floor(Math.random() * 100000000000);  }

  getCurrentTimestamp() { return new Date().getTime(); }

  waitUntilNotVisible(el, delay = 60000) {
    return browser.wait(protractor.ExpectedConditions.invisibilityOf(el), delay);
  }

  getRandomNumFloat() {
    var min = 1.00;
    var max = 10.00;
    var randomNumber = Math.random() * (max - min) + min;
    randomNumber = randomNumber.toFixed(2);
    randomNumber = Number(randomNumber);
    return randomNumber;
  }

  getTimeStampDigits(numOfDigits) {
    let val = 0;
    val = String(Math.random().toString().substr(2, numOfDigits));
    return val;
  }
  
  async getFileStringByLine(file, line) {
    let contents = await fs.readFile(file, 'utf8')
    let arrContents = contents.split('\n')
    return arrContents[line - 1]
  }
  
  async getArrayFileStrings(file) {
    return fs.readFile(file, 'utf8')
  }
}

module.exports = new Utility;
