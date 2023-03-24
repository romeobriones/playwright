const client_registerEl = require('../elements/client_register.element');
const util              = require('../utils/utility');

class RegisterClient {

    async verifyNewAcct(expect) {
        await expect(client_registerEl.checkIcon()).toBeTruthy();
    }

    async verifyNewAcctRegCont(expect) {
        await expect(client_registerEl.nextBtnSliderFirst()).toBeTruthy();
    }

    async createNewAcctCont(page) {
        await page.click(client_registerEl.nextBtnSliderFirst());
        await page.click(client_registerEl.nextBtnSlider());
        await page.click(client_registerEl.nextBtnSlider());
    }

    async verifyNewAcctCreated(expect) {
        if (client_registerEl.avatarCircle())
            await expect(client_registerEl.avatarCircle()).toBeTruthy();
        else
            console.log("\tMember account not created")
    }

    async registerCollector(page) {
        await page.click(client_registerEl.menuRegister(1));
    }

    async verifyBecomeCollector(expect) {
        await expect(client_registerEl.btnBecomeCollector()).toBeTruthy();
    }

    async tapBecomeCollector(page) {
        await page.click(client_registerEl.btnBecomeCollector());
    }

    async verifyCreateProfile(expect) {
        await expect(client_registerEl.btnCheck()).toBeTruthy();
    }

    async createNewAcct(page, country, expect) {
        let timestamp    = String(util.getCurrentTimestamp());
        let countryCount = country.countryCount;
        let countryCode  = country.countryCode;
        let countryName  = country.countryName;
        let countryFname = country.firstName;
        let countryLname = country.lastName;
        let password     = country.password;
        let smsCode      = country.smsCode;
        let mobileNum    = timestamp;
        let cellNum      = countryCode + mobileNum;

        await page.type(client_registerEl.txtFirstName(), countryFname);
        await util.delay(1000);
        await page.type(client_registerEl.txtLastName(), countryLname);
        await util.delay(1000);
        await page.click(client_registerEl.dDownCountryCode());
        await util.delay(1000);
        await page.click(client_registerEl.modalSelectCountry(countryCount));
        await util.delay(1000);
        await page.click(client_registerEl.modalBtn(1));
        await util.delay(1000);
        await page.fill(client_registerEl.txtPhoneNumber(), mobileNum);
        await util.delay(1000);
        await page.click(client_registerEl.birthDate());
        await util.delay(1000);
        await page.click(client_registerEl.modalCalValue(45));
        await util.delay(1000);
        await page.click(client_registerEl.modalCalValue(47));
        await util.delay(1000);
        await page.click(client_registerEl.modalCalValue(49));
        await util.delay(1000);
        await page.click(client_registerEl.modalCalBtn(1));
        await util.delay(1000);
        await page.click(client_registerEl.dDownGender());
        await util.delay(1000);
        await page.click(client_registerEl.modalSelectGender(0));
        await util.delay(1000);
        await page.click(client_registerEl.modalBtn(1));
        await util.delay(1000);
        await page.type(client_registerEl.password(0), password);
        await util.delay(2000)
        await page.type(client_registerEl.password(1), password);
        await util.delay(2000)
        await page.click(client_registerEl.chkAgree());
        await util.delay(1000);
        await page.click(client_registerEl.btnCheck());
        await util.delay(1000);

        if (await this.verifyCreateProfile(expect)) {
            await this.inputUserData(page, country);
            return {
                countryCount : countryCount,
                countryCode  : countryCode,
                countryName  : countryName,
                mobileNum    : mobileNum,
                cellNum      : cellNum,
                countryFname : countryFname,
                countryLname : countryLname,
                password     : password,
                smsCode      : smsCode,
            }
        } else
            return {
                countryCount : countryCount,
                countryCode  : countryCode,
                countryName  : countryName,
                mobileNum    : mobileNum,
                cellNum      : cellNum,
                countryFname : countryFname,
                countryLname : countryLname,
                password     : password,
                smsCode      : smsCode,
            }
    }

    async inputUserData(page, country) {
        let countryCount = country.countryCount;
        let countryCode  = country.countryCode;
        let countryName  = country.countryName;
        let countryFname = country.firstName;
        let countryLname = country.lastName;
        let password     = country.password;
        let smsCode      = country.smsCode;
        let mobileNum = String(util.getRandomMobileNumber());
        let cellNum   = countryCode + mobileNum;

        await page.reload();
        await page.type(client_registerEl.txtFirstName(), countryFname);
        await page.type(client_registerEl.txtLastName(), countryLname);
        await page.click(client_registerEl.dDownCountryCode());
        await page.click(client_registerEl.modalSelectCountry(countryCount));
        await page.click(client_registerEl.modalBtn(1));
        await page.fill(client_registerEl.txtPhoneNumber(), mobileNum);
        await page.click(client_registerEl.birthDate());
        await page.click(client_registerEl.modalCalValue(45));
        await page.click(client_registerEl.modalCalValue(47));
        await page.click(client_registerEl.modalCalValue(49));
        await page.click(client_registerEl.modalCalBtn(1));
        await page.click(client_registerEl.dDownGender());
        await page.click(client_registerEl.modalSelectGender(0));
        await page.click(client_registerEl.modalBtn(1));
        await page.type(client_registerEl.password(0), password);
        await page.type(client_registerEl.password(1), password);
        await page.click(client_registerEl.chkAgree());
        await page.click(client_registerEl.btnCheck());
        await util.delay(1000);
    }

    async verifyPhoneHeader(expect) {
        await expect(client_registerEl.btnSkipVerifyPhone()).toBeTruthy();
    }

    async tapSkipVerifyPhone(page) {
        await page.click(client_registerEl.btnSkipVerifyPhone());
    }

}

module.exports = new RegisterClient;
