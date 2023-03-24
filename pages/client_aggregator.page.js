const clientAggregatorEl = require('../elements/client_aggregator.element');
const clientCommonEl     = require('../elements/client_common.element');
const util               = require('../utils/utility');

class ClientAggregatorPage {

    async createBusinessAggregator(page, createdMember) {
        let cellNum  = createdMember.cellNum;
        let agName   = "AG_Auto_" + util.getCurrentTimestamp();
        let location = "AG_Auto_location_" + util.getCurrentTimestamp();
        let email    = cellNum + '@plasticBank.com'

        await this.inputDataRecyclingBusiness(page, createdMember);

        createdMember.type           = 'Aggregator';
        createdMember.cellNum        = cellNum;
        createdMember.aggregatorName = agName;
        createdMember.location       = location;
        createdMember.email          = email;

        return createdMember;
    }

    async inputDataRecyclingBusiness(page, createdMember) {
        let cellNum  = createdMember.cellNum;
        let agName   = "AG_Auto " + util.getCurrentTimestamp();
        let location = "AG_Auto_location " + util.getCurrentTimestamp();
        let email    = cellNum + '@plasticBank.com'

        await page.click(clientCommonEl.menuBurger());
        await page.click(clientCommonEl.menuCreateBusiness());
        await page.click(clientAggregatorEl.bRecyclingBusiness());
        await page.click(clientAggregatorEl.bTypeAggregator());
        await page.click(clientAggregatorEl.btnCreateBusiness());
        await page.type(clientAggregatorEl.name(), agName);
        await page.type(clientAggregatorEl.location(), location);
        await page.type(clientAggregatorEl.email(), email);
        await this.checkDailySched(page);
        await page.click(clientAggregatorEl.btnSave());
        await page.click(clientAggregatorEl.modalBtnOK(0));
        await page.click(clientAggregatorEl.btnSave());
        await page.click(clientAggregatorEl.modalRadioQuestion(0));
        await page.click(clientAggregatorEl.modalBtnOK(1));
        await page.click(clientAggregatorEl.btnDone());
        await util.delay();
    }

    async checkDailySched(page) {
        let cCount = await page.locator(clientAggregatorEl.checkBoxesAll()).count();
        for (let i = 0; i < cCount - 1; i++)
            await page.click(clientAggregatorEl.checkBoxes(i));
    }

    async verifyCreatedAggregator(expect) {
        if (clientCommonEl.menuBurger())
            await expect(clientCommonEl.menuBurger()).toBeTruthy();
        else
            console.log("\tProcessor account not successfully created");
    }

    async addMember(page, memToAdd, expect) {
        let countryCode = memToAdd.countryCode;
        let count       = memToAdd.membersToAdd;
        let membersInfo = [];
        let memberNum, timeStamp, name, email;

        while(count > 0) {
            timeStamp = String(util.getCurrentTimestamp());
            memberNum = timeStamp;
            name = "Member_" + timeStamp;

            await this.verifyDashboard(expect);
            await this.tapRegisterMember(page);
            await this.verifyRegisterBranchMember(expect);
            await page.fill(clientAggregatorEl.txtFullname(), name);
            await page.fill(clientAggregatorEl.txtPhone(), memberNum);
            await page.click(clientAggregatorEl.btnNext());
            await page.click(clientAggregatorEl.dDownGender(1));
            await page.click(clientAggregatorEl.modalSelectGender(0));
            await page.click(clientAggregatorEl.modalBtnOK(1));
            await page.click(clientAggregatorEl.btnNext());
            await page.click(clientAggregatorEl.modalBtn(0));
            await page.click(clientAggregatorEl.btnNext());
            await page.click(clientAggregatorEl.btnNext());
            await page.type(clientAggregatorEl.txtPassword(0), "555555");
            await page.type(clientAggregatorEl.txtPassword(1), "555555");
            await util.delay();
            await page.click(clientAggregatorEl.btnFinish());
            await this.successMemberAddedClosed(page);
            await this.verifyMemberConcluded(expect)

            memToAdd.memberAdded = {
                name        : name,
                countryCode : countryCode,
                memberNum   : memberNum
            }
    
            membersInfo.push(memToAdd.memberAdded);
            count--;
        }
    
        return membersInfo;
    }

    async tapRegisterMember(page) {
        await page.click(clientAggregatorEl.btnRegisterMember());
    }

    async verifyRegisterBranchMember(expect) {
        await expect(clientAggregatorEl.headerCreateNewMember()).toBeTruthy();
    }

    async verifyMemberAdded(expect) {
        await expect(clientAggregatorEl.iconAvatar()).toBeTruthy();
        await expect(clientAggregatorEl.successMemAddedMsg()).toBeTruthy();
    }

    async successMemberAddedClosed(page) {
        await page.click(clientAggregatorEl.xIconMemAdded());
    }

    async verifyMemberConcluded(expect) {
        await expect(clientCommonEl.menuBurger()).toBeTruthy();
    }
 
    async verifyDashboard(expect) {
        await expect(clientCommonEl.menuBurger()).toBeTruthy();
    }

    async transactAggregator(page, aggregatorMem, expect) {
        let agMem   = aggregatorMem.connected_branch;
        let trxInfo = [];

        await util.delay();
        await expect(clientAggregatorEl.txtSearchPhone()).toBeTruthy();
        await expect(clientAggregatorEl.btnSearch()).toBeTruthy();

        for (let i = 0; i < agMem.length; i++) {
            let trxWeight = String(util.getRandomNumFloat());

            await page.click(clientAggregatorEl.txtSearchPhone());
            await page.type(clientAggregatorEl.txtSearchPhone(), String(agMem[i]));
            await page.click(clientAggregatorEl.btnSearch());
            await util.delay();
            await page.click(clientAggregatorEl.prMemberPhone(0));
            await expect(clientAggregatorEl.btnBrExchange(0)).toBeTruthy();
            await page.click(clientAggregatorEl.btnBrExchange(0));
            await expect(clientAggregatorEl.btnWeighScale(0)).toBeTruthy();
            await page.click(clientAggregatorEl.btnWeighScale(0));
            await expect(clientAggregatorEl.txtKgValue()).toBeTruthy();
            await page.click(clientAggregatorEl.txtKgValue());
            await page.fill(clientAggregatorEl.txtKgValue(), trxWeight);
            await page.click(clientAggregatorEl.btnBrExchange(2));
            await page.click(clientAggregatorEl.btnBrExchange(1));
            await page.click(clientAggregatorEl.btnBrExchange(2));
            await expect(clientAggregatorEl.modalBtnOK(0)).toBeTruthy();
            await page.click(clientAggregatorEl.modalBtnOK(0));
            await expect(clientAggregatorEl.prMemberPhone(0)).toBeTruthy();

            trxInfo.push({
                memberOfAg : agMem[i],
                weight     : trxWeight
            });
        }

        return trxInfo;
    }

}

module.exports = new ClientAggregatorPage;
