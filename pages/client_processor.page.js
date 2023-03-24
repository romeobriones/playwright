const clientProcessorEl = require('../elements/client_processor.element');
const clientCommonEl    = require('../elements/client_common.element');
const util              = require('../utils/utility');

class ClientProcessorPage {

    async createBusinessProcessor(page, createdMember) {
        let cellNum       = createdMember.cellNum;
        let processorName = "PR_Auto_" + util.getCurrentTimestamp();
        let location      = "PR_Auto_location_" + util.getCurrentTimestamp();
        let email         = cellNum + '@plasticBank.com'

        await this.inputDataRecyclingBusiness(page, createdMember);
        createdMember.type          = 'Processor'
        createdMember.cellNum       = cellNum;
        createdMember.processorName = processorName;
        createdMember.location      = location;
        createdMember.email         = email;

        return createdMember;
    }

    async inputDataRecyclingBusiness(page, createdMember) {
        let cellNum       = createdMember.cellNum;
        let processorName = "PR_Auto_" + util.getCurrentTimestamp();
        let location      = "PR_Auto_location_" + util.getCurrentTimestamp();
        let email         = cellNum + '@plasticBank.com'
        await page.click(clientCommonEl.menuBurger());
        await page.click(clientCommonEl.menuCreateBusiness());
        await page.click(clientProcessorEl.bRecyclingBusiness());
        await page.click(clientProcessorEl.bTypeProcessor());
        await page.click(clientProcessorEl.btnCreateBusiness());
        await page.type(clientProcessorEl.name(), processorName);
        await page.type(clientProcessorEl.location(), location);
        await page.type(clientProcessorEl.email(), email);
        await this.checkDailySched(page);
        await page.click(clientProcessorEl.btnSave());
        await page.click(clientProcessorEl.modalBtnOK(0));
        let plasticDetails = await this.addAfgPlastic(page);
        await util.delay();
        return plasticDetails;
    }

    async checkDailySched(page) {
        let cCount = await page.locator(clientProcessorEl.checkBoxesAll()).count();
        for (let i = 0; i < cCount - 1; i++)
            await page.click(clientProcessorEl.checkBoxes(i));
    }

    async verifyCreatedProcessor(expect) {
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
            name      = "Member_" + timeStamp;

            await this.verifyDashboard(expect);
            await this.tapRegisterMember(page);
            await this.verifyRegisterBranchMember(expect);
            await page.fill(clientProcessorEl.txtFullname(), name);
            await page.fill(clientProcessorEl.txtPhone(), memberNum);
            await page.click(clientProcessorEl.btnNext());
            await page.click(clientProcessorEl.dDownGender(1));
            await page.click(clientProcessorEl.modalSelectGender(0));
            await page.click(clientProcessorEl.modalBtnOK(1));
            await page.click(clientProcessorEl.btnNext());
            await page.click(clientProcessorEl.modalBtn(0));
            await page.click(clientProcessorEl.btnNext());
            await page.click(clientProcessorEl.btnNext());
            await page.type(clientProcessorEl.txtPassword(0), "555555");
            await page.type(clientProcessorEl.txtPassword(1), "555555");
            await util.delay();
            await page.click(clientProcessorEl.btnFinish());
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
        await page.click(clientProcessorEl.btnRegisterMember());
    }

    async verifyRegisterBranchMember(expect) {
        await expect(clientProcessorEl.headerCreateNewMember()).toBeTruthy();
    }

    async verifyMemberAdded(expect) {
        await expect(clientProcessorEl.iconAvatar()).toBeTruthy();
        await expect(clientProcessorEl.successMemAddedMsg()).toBeTruthy();
    }

    async successMemberAddedClosed(page) {
        await page.click(clientProcessorEl.xIconMemAdded());
    }

    async verifyMemberConcluded(expect) {
        await expect(clientCommonEl.menuBurger()).toBeTruthy();
    }

    async verifyDashboard(expect) {
        await expect(clientCommonEl.menuBurger()).toBeTruthy();
    }

    async tapProcessorNumber(page) {
        await page.click(clientCommonEl.menuBurger());
        await page.click(clientCommonEl.menuMember(1));
    }

    async verifyCanAddMember(expect) {
        await expect(clientProcessorEl.btnRegisterMember()).toBeTruthy();
    }

    async transactProcessor(page, processorMem, expect) {
        let prMem   = processorMem.connected_branch;
        let trxInfo = [];

        await util.delay();
        await expect(clientProcessorEl.txtSearchPhone()).toBeTruthy();
        await expect(clientProcessorEl.btnSearch()).toBeTruthy();

        for (let i = 0; i < prMem.length; i++) {
            let trxWeight = String(util.getRandomNumFloat());

            await page.click(clientProcessorEl.txtSearchPhone());
            await page.type(clientProcessorEl.txtSearchPhone(), String(prMem[i]));
            await page.click(clientProcessorEl.btnSearch());
            await util.delay();
            await page.click(clientProcessorEl.prMemberPhone(0));
            await expect(clientProcessorEl.btnBrExchange(0)).toBeTruthy();
            await page.click(clientProcessorEl.btnBrExchange(0));
            await expect(clientProcessorEl.btnWeighScale(0)).toBeTruthy();
            await page.click(clientProcessorEl.btnWeighScale(0));
            await expect(clientProcessorEl.txtKgValue()).toBeTruthy();
            await page.click(clientProcessorEl.txtKgValue());
            await page.fill(clientProcessorEl.txtKgValue(), trxWeight);
            await page.click(clientProcessorEl.btnBrExchange(2));
            await page.click(clientProcessorEl.btnBrExchange(1));
            await page.click(clientProcessorEl.btnBrExchange(2));
            await expect(clientProcessorEl.modalBtnOK(0)).toBeTruthy();
            await page.click(clientProcessorEl.modalBtnOK(0));
            await expect(clientProcessorEl.prMemberPhone(0)).toBeTruthy();

            trxInfo.push({
                memberOfPr : prMem[i],
                weight     : trxWeight
            });
        }

        return trxInfo;
    }

    async transactProcessorBuy(page, branchMem, expect) {
        //let prMem   = processorMem.connected_branch;
        let trxInfo = [];

        await util.delay();
        await expect(clientProcessorEl.txtSearchPhone()).toBeTruthy();
        await expect(clientProcessorEl.btnSearch()).toBeTruthy();

        let trxWeight = String(util.getRandomNumFloat());

        await page.click(clientProcessorEl.txtSearchPhone());
        await page.type(clientProcessorEl.txtSearchPhone(), String(branchMem.cellNum));
        await page.click(clientProcessorEl.btnSearch());
        await util.delay();
        await page.click(clientProcessorEl.prMemberPhone(0));
        await expect(clientProcessorEl.btnBrExchange(0)).toBeTruthy();
        await page.click(clientProcessorEl.btnBrExchange(0));
        await expect(clientProcessorEl.btnWeighScale(0)).toBeTruthy();
        await page.click(clientProcessorEl.btnWeighScale(0));
        await expect(clientProcessorEl.txtKgValue()).toBeTruthy();
        await page.click(clientProcessorEl.txtKgValue());
        await page.fill(clientProcessorEl.txtKgValue(), trxWeight);
        await page.click(clientProcessorEl.btnBrExchange(2));
        await page.click(clientProcessorEl.btnBrExchange(1));
        await page.click(clientProcessorEl.btnBrExchange(2));
        await expect(clientProcessorEl.modalBtnOK(0)).toBeTruthy();
        await page.click(clientProcessorEl.modalBtnOK(0));
        await expect(clientProcessorEl.prMemberPhone(0)).toBeTruthy();

        trxInfo.push({
            cellNum    : branchMem.cellNum,
            weight     : trxWeight
        });

        return trxInfo;
    }

    async trxProcessor(page, processorMem, expect) {
        let prMem   = processorMem.connected_branches;
        let trxInfo = [];

        await util.delay();
        await expect(clientProcessorEl.txtSearchPhone()).toBeTruthy();
        await expect(clientProcessorEl.btnSearch()).toBeTruthy();

        for (let i = 0; i < prMem.length; i++) {
            let trxWeight = String(util.getRandomNumFloat());
            let afgPlasticType = prMem[i][1];

            await page.click(clientProcessorEl.txtSearchPhone());
            await page.type(clientProcessorEl.txtSearchPhone(), String(prMem[i][0]));
            await page.click(clientProcessorEl.btnSearch());
            await page.click(clientProcessorEl.prMemberPhone(0));
            await expect(clientProcessorEl.btnBrExchange(0)).toBeTruthy();
            await page.click(clientProcessorEl.btnBrExchange(0));
            await page.click(clientProcessorEl.tabAllItems(1));
            await expect(clientProcessorEl.btnWeighScale(0)).toBeTruthy();

            switch(afgPlasticType) {
                case 'Mixed Plastic':
                    await page.click(clientProcessorEl.btnWeighScale(i));
                    console.log("\tProcessor transacts to branch - Afg Plastic:", afgPlasticType);
                    break;
                case 'HDPE-Mixed':
                    await page.click(clientProcessorEl.btnWeighScale(i));
                    console.log("\tProcessor transacts to branch - Afg Plastic:", afgPlasticType);
                    break;
                case 'PET-Mixed':
                    await page.click(clientProcessorEl.btnWeighScale(i));
                    console.log("\tProcessor transacts to branch - Afg Plastic:", afgPlasticType);
                    break;
                case 'PP-Mixed':
                    await page.click(clientProcessorEl.btnWeighScale(i));
                    console.log("\tProcessor transacts to branch - Afg Plastic:", afgPlasticType);
                    break;
                case 'PS-Mixed':
                    await page.click(clientProcessorEl.btnWeighScale(i));
                    console.log("\tProcessor transacts to branch - Afg Plastic:", afgPlasticType);
                    break;
                case 'LDPE-Mixed':
                    await page.click(clientProcessorEl.btnWeighScale(i));
                    console.log("\tProcessor transacts to branch - Afg Plastic:", afgPlasticType);
                    break;
                case 'PVC-Mixed':
                    await page.click(clientProcessorEl.btnWeighScale(i));
                    console.log("\tProcessor transacts to branch - Afg Plastic:", afgPlasticType);
                    break;
                case 'ABS-Mixed':
                    await page.click(clientProcessorEl.btnWeighScale(i));
                    console.log("\tProcessor transacts to branch - Afg Plastic:", afgPlasticType);
                    break;
                case 'Caps-Mixed':
                    await page.click(clientProcessorEl.btnWeighScale(i));
                    console.log("\tProcessor transacts to branch - Afg Plastic:", afgPlasticType);
                    break;
                case 'MALUTONG':
                    await page.click(clientProcessorEl.btnWeighScale(i));
                    console.log("\tProcessor transacts to branch - Afg Plastic:", afgPlasticType);
                    break;
                case 'MONOBLOCK-Colored':
                    await page.click(clientProcessorEl.btnWeighScale(i));
                    console.log("\tProcessor transacts to branch - Afg Plastic:", afgPlasticType);
                    break;
                default:
                    await page.click(clientProcessorEl.btnWeighScale(i));
                    console.log('\tProcessor transacts to branch - ' + afgPlasticType + ' - Afg Plastic which maybe customly added');
            }

            await expect(clientProcessorEl.txtKgValue()).toBeTruthy();
            await page.click(clientProcessorEl.txtKgValue());
            await page.fill(clientProcessorEl.txtKgValue(), trxWeight);
            await page.click(clientProcessorEl.btnBrExchange(2));
            await page.click(clientProcessorEl.btnBrExchange(1));
            await page.click(clientProcessorEl.btnBrExchange(2));
            await expect(clientProcessorEl.modalBtnOK(0)).toBeTruthy();
            await page.click(clientProcessorEl.modalBtnOK(0));
            await expect(clientProcessorEl.prMemberPhone(0)).toBeTruthy();

            trxInfo.push({
                memberOfPr : prMem[i][0] + ',' + prMem[i][1],
                weight     : trxWeight
            });
        }

        return trxInfo;
    }

    async trxBranchToProcessor(page, expect, processorMem) {
        let prMem   = processorMem.connected_branches;
        let trxInfo = [];

        for(let key in prMem) {
            await util.delay();
            await expect(clientProcessorEl.txtSearchPhone()).toBeTruthy();
            await expect(clientProcessorEl.btnSearch()).toBeTruthy();
            await page.click(clientProcessorEl.txtSearchPhone());
            await page.type(clientProcessorEl.txtSearchPhone(), String(key));
            await page.click(clientProcessorEl.btnSearch());
            await page.click(clientProcessorEl.prMemberPhone(0));
            await expect(clientProcessorEl.btnBrExchange(0)).toBeTruthy();
            await page.click(clientProcessorEl.btnBrExchange(0));
            await page.click(clientProcessorEl.tabAllItems(1));
            await expect(clientProcessorEl.btnWeighScale(0)).toBeTruthy();

            for(let i = 0; i < prMem[key].length; i++) {
                let trxWeight = String(util.getRandomNumFloat());
                let afgPlasticType = prMem[key][i];

                for (let j = 0; j < await page.locator(clientProcessorEl.lblItemNames()).count(); j++) {
                    let item = await page.locator(clientProcessorEl.lblItemName(j)).innerText();

                    if (afgPlasticType == item)
                        await page.click(clientProcessorEl.lblItemName(j));
                }

                console.log("\tprocessor transacts to branch - Afg Plastic:", afgPlasticType, trxWeight, "kg");
                await expect(clientProcessorEl.txtKgValue()).toBeTruthy();
                await page.click(clientProcessorEl.txtKgValue());
                await page.fill(clientProcessorEl.txtKgValue(), trxWeight);
                await page.click(clientProcessorEl.btnBrExchange(2));

                trxInfo.push({
                    memberOfPr : key + ' - ' + prMem[key][i],
                    weight     : trxWeight
                });
            }

            await page.click(clientProcessorEl.btnBrExchange(1));
            await page.click(clientProcessorEl.btnBrExchange(2));
            await expect(clientProcessorEl.modalBtnOK(0)).toBeTruthy();
            await page.click(clientProcessorEl.modalBtnOK(0));
            await expect(clientProcessorEl.prMemberPhone(0)).toBeTruthy();
        }

        return trxInfo;
    }

    async addAfgPlastic(page) {
        await page.click(clientProcessorEl.materialProperties(2));

        let plasticName, randValPerKg, randKgInv;
        let addedAfgPlastic  = {};
        let addedAfgPlastics = [];
        let cCanel  = await page.locator(clientProcessorEl.modalInvConfirm(0));
        let count  = await page.locator(clientProcessorEl.meterialTypes()).count();

        for (let i = 0; i < count - 1; i++ ) {
            randValPerKg = (Math.random() * (10 - 1) + 1).toFixed(2);
            randKgInv    = (Math.random() * (10 - 1) + 1).toFixed(2);

            if (i == count - 2) {
                await page.click(clientProcessorEl.modalInvConfirm(0));
                await page.click(clientProcessorEl.backBtn(2));
            } else {
                plasticName = await page.locator(clientProcessorEl.materialTypeLabel(i)).innerText();
                await page.click(clientProcessorEl.materialTypeLabel(i));
                await page.click(clientProcessorEl.modalInvConfirm(1));
                await page.click(clientProcessorEl.kgVal());
                await page.type(clientProcessorEl.kgVal(), randValPerKg);
                await page.click(clientProcessorEl.kgInventory());
                await page.type(clientProcessorEl.kgInventory(), randKgInv);

                if (i == 0) {
                    await page.click(clientProcessorEl.btnSave());
                    await page.click(clientProcessorEl.btnDone());
                } else
                    await page.click(clientProcessorEl.saveAdd(1));

                await page.click(clientProcessorEl.tabIcon(2));
                await page.click(clientProcessorEl.btnSave());

                if (cCanel)
                    await page.click(clientProcessorEl.modalInvConfirm(0));

                await page.click(clientProcessorEl.materialProperties(2));
            }

            addedAfgPlastic = {
                plasticName  : plasticName,
                randValPerKg : randValPerKg,
                randKgInv    : randKgInv
            }

            addedAfgPlastics.push(addedAfgPlastic);
        }

        return addedAfgPlastics;
    }

}

module.exports = new ClientProcessorPage;
