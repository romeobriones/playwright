const clientBranchEl = require('../elements/client_branch.element');
const clientCommonEl = require('../elements/client_common.element');
const util           = require('../utils/utility');
const commonPage = require("./common.page");

class ClientBranchPage {

    async createBusinessBranch(page, createdMember) {
        let timeStamp  = String(util.getCurrentTimestamp());
        let branchType = createdMember.type;
        let cellNum    = createdMember.cellNum;
        let email      = cellNum + '@plasticBank.com';
        let branchName = "BR_Auto_Name_" + timeStamp;
        let location   = "BR_Auto_location_" + timeStamp;
        let plasticDetails;

        switch(branchType) {
            case 'Collection Point':
                branchType = 'Collection Point';
                plasticDetails = await this.inputDataRecyclingBusiness(page, createdMember);
                break;
            case 'Coop':
                branchType = 'Coop';
                await this.inputDataRecyclingBusiness(page, createdMember);
                break;
            case 'Store':
                branchType = 'Store';
                await this.inputDataStore(page, createdMember);
                break;
            case 'Workplace Program':
                branchType = 'Workplace Program';
                await this.inputDataProgram(page, createdMember);
                break
            case 'Faith Program':
                branchType = 'Faith Program';
                await this.inputDataProgram(page, createdMember);
                break;
            case 'School Program':
                branchType = 'School Program';
                await this.inputDataProgram(page, createdMember);
                break;
            default:
                console.log('\tSpecified branch type is neither of the ff: Collection Point, Coop, Store, Workplace Program, School Program, and, Faith Program.');
                return;
        }

        createdMember.cellNum        = cellNum;
        createdMember.branchName     = branchName;
        createdMember.location       = location;
        createdMember.email          = email;
        createdMember.plasticDetails = plasticDetails;
        createdMember.brType         = branchType;

        return createdMember;
    }

    async addAfgPlastic(page) {
        await page.click(clientBranchEl.materialProperties(2));

        let plasticName, randValPerKg, randKgInv;
        let addedAfgPlastic  = {};
        let addedAfgPlastics = [];

        let btnDone = await page.locator(clientBranchEl.btnDone());
        let btnSave = await page.locator(clientBranchEl.btnSave());
        let cCanel  = await page.locator(clientBranchEl.modalInvConfirm(0));
        let count  = await page.locator(clientBranchEl.meterialTypes()).count();

        for (let i = 0; i < count - 1; i++ ) {
            randValPerKg = (Math.random() * (10 - 1) + 1).toFixed(2);
            randKgInv    = (Math.random() * (10 - 1) + 1).toFixed(2);

            if (i == count - 2) {
                await page.click(clientBranchEl.modalInvConfirm(0));
                await page.click(clientBranchEl.backBtn(2));
            } else {
                plasticName = await page.locator(clientBranchEl.materialTypeLabel(i)).innerText();
                await page.click(clientBranchEl.materialTypeLabel(i));
                await page.click(clientBranchEl.modalInvConfirm(1));
                await page.click(clientBranchEl.kgVal());
                await page.type(clientBranchEl.kgVal(), randValPerKg);
                await page.click(clientBranchEl.kgInventory());
                await page.type(clientBranchEl.kgInventory(), randKgInv);

                if (i == 0) {
                    await page.click(clientBranchEl.btnSave());
                    await page.click(clientBranchEl.btnDone());
                } else
                    await page.click(clientBranchEl.saveAdd(1));

                await page.click(clientBranchEl.tabIcon(3));
                await page.click(clientBranchEl.btnSave());

                if (cCanel)
                    await page.click(clientBranchEl.modalInvConfirm(0));

                await page.click(clientBranchEl.materialProperties(2));
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

    async addPhPlastic(page) {
        const msgPromise = page.waitForEvent('console');
        await page.evaluate(() => {
            console.log('hello', 42, { foo: 'bar' });  // Issue console.log inside the page
        });
        const msg = await msgPromise;
        page.on('console', msg => console.log(msg.text()))
        await page.click(clientBranchEl.materialProperties(2));

        let plasticName, randValPerKg, randKgInv;
        let addedPhPlastic  = {};
        let addedPhPlastics = [];

        let btnDone = await page.locator(clientBranchEl.btnDone());
        let btnSave = await page.locator(clientBranchEl.btnSave());
        let cCancel  = await page.locator(clientBranchEl.modalInvConfirm(0));
        let count  = await page.locator(clientBranchEl.meterialTypes()).count();

        let i
        for (i = 0; i < 3; i++ ) {
            randValPerKg = (Math.random() * (10 - 1) + 1).toFixed(2);
            randKgInv    = (Math.random() * (10 - 1) + 1).toFixed(2);

            if (i == count - 2) {
                await page.click(clientBranchEl.modalInvConfirm(0));
                await page.click(clientBranchEl.backBtn(2));
            } else {
                plasticName = await page.locator(clientBranchEl.materialTypeLabel(i)).innerText();
                await page.click(clientBranchEl.materialTypeLabel(i));
                await page.click(clientBranchEl.modalInvConfirm(1));
                await page.click(clientBranchEl.kgVal());
                await page.type(clientBranchEl.kgVal(), randValPerKg);
                await page.click(clientBranchEl.kgInventory());
                await page.type(clientBranchEl.kgInventory(), randKgInv);

                if (i == 0) {
                    await page.click(clientBranchEl.btnSave());
                    await page.click(clientBranchEl.btnDone());
                } else
                    await page.click(clientBranchEl.saveAdd(1));

                await page.click(clientBranchEl.tabIcon(3));
                await page.click(clientBranchEl.btnSave());

                if (cCancel)
                    await page.click(clientBranchEl.modalInvConfirm(0));

                await page.click(clientBranchEl.materialProperties(2));
            }

            addedPhPlastic = {
                plasticName  : plasticName,
                randValPerKg : randValPerKg,
                randKgInv    : randKgInv
            }

            addedPhPlastics.push(addedPhPlastic)
        }

        if (i != count - 2) {
            await page.click(clientBranchEl.modalInvConfirm(0));
            await page.click(clientBranchEl.backBtn(2));
        }
        return addedPhPlastics
    }

    async inputDataRecyclingBusiness(page, createdMember) {
        let timeStamp  = String(util.getCurrentTimestamp());
        let cellNum    = createdMember.cellNum;
        let email      = cellNum + '@plasticBank.com';
        let branchName = "BR_Auto_Name_" + timeStamp;
        let location   = "BR_Auto_location_" + timeStamp;

        await util.delay(1000)
        await page.click(clientCommonEl.menuBurger());
        await util.delay(1000)

        await page.click(clientCommonEl.menuCreateBusiness());
        await util.delay(1000)

        await page.click(clientBranchEl.bRecyclingBusiness());
        await util.delay(1000)

        await page.click(clientBranchEl.bTypeRecyclingBusiness(5));
        await util.delay(1000)

        await page.click(clientBranchEl.btnCreateBusiness());
        await util.delay(1000)

        await page.type(clientBranchEl.name(), branchName);
        await util.delay(1000)

        await page.type(clientBranchEl.location(), location);
        await util.delay(1000)

        await page.type(clientBranchEl.email(), email);
        await util.delay(1000)

        await this.checkDailySched(page);
        await util.delay(1000)

        await page.click(clientBranchEl.btnSave());
        await util.delay(1000)

        await page.click(clientBranchEl.modalBtnOK(0));
        await util.delay(1000)

        let plasticDetails = await this.addPhPlastic(page);
        await util.delay();
        return plasticDetails;
    }

    async inputDataProgram(page, createdMember) {
        let timeStamp  = String(util.getCurrentTimestamp());
        let cellNum    = createdMember.cellNum;
        let branchName = "BR_Auto Name_" + timeStamp;
        let location   = "BR_Auto_location_" + timeStamp;
        let email      = cellNum + '@plasticBank.com';

        await page.click(clientCommonEl.menuBurger());
        await page.click(clientCommonEl.menuCreateBusiness());
        await page.click(clientBranchEl.bTypeRecyclingBusiness(2));
        await page.click(clientBranchEl.btnCreateBusiness());
        await page.type(clientBranchEl.name(), branchName);
        await page.type(clientBranchEl.location(), location);
        await page.type(clientBranchEl.email(), email);
        await this.checkDailySched(page);
        await page.click(clientBranchEl.btnSave());
        await page.click(clientBranchEl.modalBtnOK(0));
        await page.click(clientBranchEl.btnSave());
        await page.click(clientBranchEl.modalRadioQuestion(0));
        await page.click(clientBranchEl.modalBtnOK(1));
        await page.click(clientBranchEl.btnDone());
        await util.delay();
    }

    async inputDataStore(page, createdMember) {
        let timeStamp     = String(util.getCurrentTimestamp());
        let cellNum       = createdMember.cellNum;
        let email         = cellNum + '@plasticBank.com';
        let branchName    = "BR_Auto_Name_" + timeStamp;
        let location      = "BR_Auto_location_" + timeStamp;
        let storeItemName = 'Auto_ItemName_' + timeStamp;

        await page.click(clientCommonEl.menuBurger());
        await page.click(clientCommonEl.menuCreateBusiness());
        await page.click(clientBranchEl.bTypeRecyclingBusiness(1));
        await page.click(clientBranchEl.btnCreateBusiness());
        await page.type(clientBranchEl.name(), branchName);
        await page.type(clientBranchEl.location(), location);
        await page.type(clientBranchEl.email(), email);
        await this.checkDailySched(page);
        await page.click(clientBranchEl.btnSave());
        await page.click(clientBranchEl.modalBtnOK(0));
        await page.type(clientBranchEl.storeItem(), storeItemName);
        await page.type(clientBranchEl.storeItemPrice(), '10000');
        await page.type(clientBranchEl.storeItemAmount(), '10');
        await page.click(clientBranchEl.btnUpper(2));
        await page.click(clientBranchEl.btnGreen());
        await util.delay();
    }

    async checkDailySched(page) {
        let cCount = await page.locator(clientBranchEl.checkBoxesAll()).count();
        for (let i = 0; i < cCount - 1; i++)
            await page.click(clientBranchEl.checkBoxes(i));
    }

    async verifyNewAcctCreated(expect) {
        if (clientCommonEl.menuBurger())
            await expect(clientCommonEl.menuBurger()).toBeTruthy();
        else
            console.log("\tBranch account not successfully created");
    }

    async addOneMember(page, memToAdd, expect) {
      let countryCode = memToAdd.countryCode;
      let membersInfo = [];
      let memberNum, name, email;
      let countryCount = memToAdd.countryCount;
      let brType = memToAdd.brType;

      let timeStamp = String(util.getCurrentTimestamp());
      memberNum = timeStamp;
      name      = "Member_" + timeStamp;

      await this.tapRegisterMember(page);
      await this.verifyRegisterBranchMember(expect);
      await page.fill(clientBranchEl.txtFullname(), name);
      await page.fill(clientBranchEl.txtPhone(), memberNum);
      await page.click(clientBranchEl.btnNext());
      await page.click(clientBranchEl.dDownGender(1));
      await page.click(clientBranchEl.modalSelectGender(0));
      await page.click(clientBranchEl.modalBtnOK(1));
      await page.click(clientBranchEl.btnNext());
      await page.click(clientBranchEl.modalBtnConfirm(0));
      await page.click(clientBranchEl.btnNext());
      await page.click(clientBranchEl.btnNext());
      await page.type(clientBranchEl.txtPassword(0), "555555");
      await page.type(clientBranchEl.txtPassword(1), "555555");
      await util.delay();
      await page.click(clientBranchEl.btnFinish());
      await this.successMemberAddedClosed(page);
      await this.verifyMemberConcluded(expect)

      memToAdd.memberAdded = {
          name         : name,
          countryCode  : countryCode,
          memberNum    : memberNum,
          email        : email,
          countryCount : countryCount,
          brType       : brType
      }

      membersInfo.push(await memToAdd.memberAdded);
      return membersInfo;
    }

    async addMember(page, memToAdd, expect, maxCreated = 3) {
        let countryCode = memToAdd.countryCode;
        let count       = memToAdd.membersToAdd;
        let membersInfo = [];
        let memberNum, name, email;
        let countryCount = memToAdd.countryCount;
        let brType = memToAdd.brType;

        if (count == undefined)
            count = maxCreated;

        while(count > 0) {
            let timeStamp = String(util.getCurrentTimestamp());
            memberNum = timeStamp;
            name      = "Member_" + timeStamp;

            await this.tapRegisterMember(page);
            await util.delay(1000)
            await this.verifyRegisterBranchMember(expect);
            await page.fill(clientBranchEl.txtFullname(), name);
            await util.delay(1000)

            await page.fill(clientBranchEl.txtPhone(), memberNum);
            await util.delay(1000)

            await page.click(clientBranchEl.btnNext());
            await util.delay(1000)

            await page.click(clientBranchEl.dDownGender(1));
            await util.delay(1000)

            await page.click(clientBranchEl.modalSelectGender(0));
            await util.delay(1000)

            await page.click(clientBranchEl.modalBtnOK(1));
            await util.delay(1000)

            await page.click(clientBranchEl.btnNext());
            await util.delay(1000)

            await page.click(clientBranchEl.modalBtnConfirm(0));
            await util.delay(1000)

            await page.click(clientBranchEl.btnNext());
            await util.delay(1000)

            await page.click(clientBranchEl.btnNext());
            await util.delay(1000)

            await page.type(clientBranchEl.txtPassword(0), "555555");
            await util.delay(1000)

            await page.type(clientBranchEl.txtPassword(1), "555555");
            await util.delay(1000)
            await page.click(clientBranchEl.btnFinish());
            await util.delay(1000)

            await this.successMemberAddedClosed(page);
            await util.delay(1000)

            await this.verifyMemberConcluded(expect)

            memToAdd.memberAdded = {
                name         : name,
                countryCode  : countryCode,
                memberNum    : memberNum,
                email        : email,
                countryCount : countryCount,
                brType       : brType
            }

            membersInfo.push(await memToAdd.memberAdded);
            count--;
        }
        return membersInfo;
    }

    async tapRegisterMember(page) {
        await page.click(clientBranchEl.btnRegisterMember());
    }

    async verifyRegisterBranchMember(expect) {
        await expect(clientBranchEl.headerCreateNewMember()).toBeTruthy();
    }

    async verifyMemberAdded(expect) {
        await expect(clientBranchEl.iconAvatar()).toBeTruthy();
        await expect(clientBranchEl.successMemAddedMsg()).toBeTruthy();
    }

    async successMemberAddedClosed(page) {
        await page.click(clientBranchEl.xIconMemAdded());
    }

    async verifyMemberConcluded(expect) {
        await expect(clientCommonEl.menuBurger()).toBeTruthy();
    }

    async verifyDashboard(expect) {
        await expect(clientCommonEl.menuBurger()).toBeTruthy();
    }

    async transactToMem(page, expect, member) {
        let members = member.members;
        let trxInfo = [];

        await expect(clientBranchEl.brMemberPhone(0)).toBeTruthy();

        for (let i = 0; i < members.length; i++) {
            let trxWeight = String(util.getRandomNumFloat());

            await page.click(clientBranchEl.brMemberPhone(i));
            await expect(clientBranchEl.btnBrExchange(0)).toBeTruthy();
            await page.click(clientBranchEl.btnBrExchange(0));
            await expect(clientBranchEl.btnWeighScale(0)).toBeTruthy();
            await page.click(clientBranchEl.btnWeighScale(0));
            await expect(clientBranchEl.txtKgValue()).toBeTruthy();
            await page.click(clientBranchEl.txtKgValue());
            await page.fill(clientBranchEl.txtKgValue(), trxWeight);
            await page.click(clientBranchEl.btnBrExchange(2));
            await page.click(clientBranchEl.btnBrExchange(1));
            await page.click(clientBranchEl.btnBrExchange(2));
            await expect(clientBranchEl.modalBtnOK(0)).toBeTruthy();
            await page.click(clientBranchEl.modalBtnOK(0));
            await expect(clientBranchEl.brMemberPhone(i)).toBeTruthy();

            trxInfo.push({
                mem     : members[i],
                weight  : trxWeight
            });
        }

        return trxInfo;
    }

    async transactToSpecificMemBuyWithBonus(page, expect, member, bonusData) {
        let trxInfo     = [];
        let members = member.addedBrMember;

        await expect(clientBranchEl.brMemberPhone(0)).toBeTruthy();

        for (let i = 0; i < members.length; i++) {
            await page.click(clientBranchEl.brMemberPhone(i));
            await expect(clientBranchEl.btnBrExchange(0)).toBeTruthy();
            await page.click(clientBranchEl.btnBrExchange(0));
            await expect(clientBranchEl.btnWeighScale(0)).toBeTruthy();

            let trxWeight = String(util.getRandomNumFloat());

            // getting base price
            let locatorPrice = `(//exchange-inventory-item//*[contains(@class, "item-name")]//following-sibling::div[1])[1]`
            let pricePerKg = (await page.locator(locatorPrice).innerText()).split('/')[0].trim().slice(0, -1)

            // check if bonus label is there
            let locator = `(//exchange-inventory-item//*[contains(@class, "bonus-container")]/div)[1]`
            await expect(await commonPage.waitForElementDisplayed(page, locator, 1, true)).toBeTruthy();

            locator = `(//*[contains(@class, "weight-item")])[1]`
            await page.click(locator) // weighing scale
            await expect(clientBranchEl.txtKgValue()).toBeTruthy();
            await page.click(clientBranchEl.txtKgValue());
            await page.fill(clientBranchEl.txtKgValue(), trxWeight);

            // check bonus computation by trxWeight
            let totalBonus = parseInt(parseFloat(bonusData.memberBonus) * trxWeight)
            locator = `//*[text()="+${totalBonus} Bonus"]`
            await expect(await commonPage.waitForElementDisplayed(page, locator, 1, true)).toBeTruthy();
            await page.click(clientBranchEl.btnBrExchange(2));

            // check bottom per kg computation
            locator = `//*[@class="total-text"]`
            let expectedPrice = `${(trxWeight * pricePerKg).toFixed(2)}`
            expectedPrice = (expectedPrice % 1 === 0) ? parseInt(expectedPrice) : expectedPrice
            await expect(await page.locator(locator)).toContainText(expectedPrice);
            locator = `//*[text()="${totalBonus} Bonus"]`
            await expect(await commonPage.waitForElementDisplayed(page, locator, 1, true)).toBeTruthy();
            await page.click(clientBranchEl.btnBrExchange(1));

            // check upper per kg computation
            locator = '(//*[@class="total-text"])[2]'
            await expect(await page.locator(locator)).toContainText(expectedPrice)
            locator = `(//*[text()="${totalBonus} Bonus"])[2]`
            await expect(await commonPage.waitForElementDisplayed(page, locator, 1, true)).toBeTruthy()
            await page.click(clientBranchEl.btnBrExchange(2))

            // Verify price in popup is correct
            locator = '//*[contains(@class, "amount")]'
            await expect(await page.locator(locator)).toContainText(expectedPrice)
            await expect(clientBranchEl.modalBtnOK(0)).toBeTruthy()
            await page.click(clientBranchEl.modalBtnOK(0))
            await expect(clientBranchEl.brMemberPhone(i)).toBeTruthy()

            trxInfo.push({
                mem     : members[i],
                weight  : trxWeight
            });
        }
        return trxInfo;
    }

    async transactToMemBuy(page, expect, member) {
        let members     = member.addedBrMember;
        let trxInfo     = [];

        await expect(clientBranchEl.brMemberPhone(0)).toBeTruthy();

        for (let i = 0; i < members.length; i++) {
            let trxWeight = String(util.getRandomNumFloat());

            await page.click(clientBranchEl.brMemberPhone(i));
            await expect(clientBranchEl.btnBrExchange(0)).toBeTruthy();
            await page.click(clientBranchEl.btnBrExchange(0));
            await expect(clientBranchEl.btnWeighScale(0)).toBeTruthy();
            await page.click(clientBranchEl.btnWeighScale(0));
            await expect(clientBranchEl.txtKgValue()).toBeTruthy();
            await page.click(clientBranchEl.txtKgValue());
            await page.fill(clientBranchEl.txtKgValue(), trxWeight);
            await page.click(clientBranchEl.btnBrExchange(2));
            await page.click(clientBranchEl.btnBrExchange(1));
            await page.click(clientBranchEl.btnBrExchange(2));
            await expect(clientBranchEl.modalBtnOK(0)).toBeTruthy();
            await page.click(clientBranchEl.modalBtnOK(0));
            await expect(clientBranchEl.brMemberPhone(i)).toBeTruthy();

            trxInfo.push({
                mem     : members[i],
                weight  : trxWeight
            });
        }
        return trxInfo;
    }

    async transactToBranch(page, branchMem, expect) {
        let brMem   = branchMem.connected_branch;
        let trxInfo = [];

        await util.delay();
        await expect(clientBranchEl.txtSearchPhone()).toBeTruthy();
        await expect(clientBranchEl.btnSearch()).toBeTruthy();

        for (let i = 0; i < brMem.length; i++) {
            let trxWeight = String(util.getRandomNumFloat());

            await page.click(clientBranchEl.txtSearchPhone());
            await page.type(clientBranchEl.txtSearchPhone(), String(brMem[i]));
            await page.click(clientBranchEl.btnSearch());
            await util.delay()
            await page.click(clientBranchEl.brMemberPhone(0));
            await expect(clientBranchEl.btnBrExchange(0)).toBeTruthy();
            await page.click(clientBranchEl.btnBrExchange(0));
            await expect(clientBranchEl.btnWeighScale(0)).toBeTruthy();
            await page.click(clientBranchEl.btnWeighScale(0));
            await expect(clientBranchEl.txtKgValue()).toBeTruthy();
            await page.click(clientBranchEl.txtKgValue());
            await page.fill(clientBranchEl.txtKgValue(), trxWeight);
            await page.click(clientBranchEl.btnBrExchange(2));
            await page.click(clientBranchEl.btnBrExchange(1));
            await page.click(clientBranchEl.btnBrExchange(2));
            await expect(clientBranchEl.modalBtnOK(0)).toBeTruthy();
            await page.click(clientBranchEl.modalBtnOK(0));
            await expect(clientBranchEl.brMemberPhone(0)).toBeTruthy();

            trxInfo.push({
                memberOfBr : brMem[i],
                weight     : trxWeight
            });
        }

        return trxInfo;
    }

    async transactToBranchBuy(page, branchMem, expect) {
        let trxInfo = [];

        await util.delay();
        await expect(clientBranchEl.txtSearchPhone()).toBeTruthy();
        await expect(clientBranchEl.btnSearch()).toBeTruthy();

        let trxWeight = String(util.getRandomNumFloat());

        await page.click(clientBranchEl.txtSearchPhone());
        await page.type(clientBranchEl.txtSearchPhone(), String(branchMem.cellNum));
        await page.click(clientBranchEl.btnSearch());

        await page.click(clientBranchEl.brMemberPhone(0));
        await expect(clientBranchEl.btnBrExchange(0)).toBeTruthy();

        await page.click(clientBranchEl.btnBrExchange(0));
        await expect(clientBranchEl.btnWeighScale(0)).toBeTruthy();

        await page.click(clientBranchEl.btnWeighScale(0));
        await expect(clientBranchEl.txtKgValue()).toBeTruthy();

        await page.click(clientBranchEl.txtKgValue());

        await page.fill(clientBranchEl.txtKgValue(), trxWeight);
        await page.click(clientBranchEl.btnBrExchange(2));

        await page.click(clientBranchEl.btnBrExchange(1));

        await page.click(clientBranchEl.btnBrExchange(2));
        await expect(clientBranchEl.modalBtnOK(0)).toBeTruthy();

        await page.click(clientBranchEl.modalBtnOK(0));
        await expect(clientBranchEl.brMemberPhone(0)).toBeTruthy();

        trxInfo.push({
            cellNum    : branchMem.cellNum,
            weight     : trxWeight
        });

        return trxInfo;
    }

    async transactToBranchBuyWithBonus(page, branchMem, expect) {
        let trxInfo = [];

        await util.delay();
        await expect(clientBranchEl.txtSearchPhone()).toBeTruthy();
        await expect(clientBranchEl.btnSearch()).toBeTruthy();

        let trxWeight = String(util.getRandomNumFloat());

        await page.click(clientBranchEl.txtSearchPhone());
        await page.type(clientBranchEl.txtSearchPhone(), String(branchMem.cellNum));
        await page.click(clientBranchEl.btnSearch());
        let locator = `//*[contains(text(), "Branch")]//following-sibling::*[contains(text(), "${branchMem.branchName}")]`
        await page.click(locator);
        await expect(clientBranchEl.btnBrExchange(0)).toBeTruthy();

        await page.click(clientBranchEl.btnBrExchange(0));
        await expect(clientBranchEl.btnWeighScale(0)).toBeTruthy();
        //locator = '//*[text()="Bonus"]'
        //await expect(await page.locator(locator)).toContainText('Bonus')
 
        await page.click(clientBranchEl.btnWeighScale(0));
        await expect(clientBranchEl.txtKgValue()).toBeTruthy();

        await page.click(clientBranchEl.txtKgValue());

        await page.fill(clientBranchEl.txtKgValue(), trxWeight);
        await page.click(clientBranchEl.btnBrExchange(2));

        await page.click(clientBranchEl.btnBrExchange(1));

        await page.click(clientBranchEl.btnBrExchange(2));
        await expect(clientBranchEl.modalBtnOK(0)).toBeTruthy();

        await page.click(clientBranchEl.modalBtnOK(0));
        await expect(clientBranchEl.brMemberPhone(0)).toBeTruthy();

        trxInfo.push({
            cellNum    : branchMem.cellNum,
            weight     : trxWeight
        });

        return trxInfo;
    }

    async trxToMembers(page, branchMem, expect) {
        let brMem   = branchMem.members;
        let trxInfo = [];

        await util.delay();
        await expect(clientBranchEl.txtSearchPhone()).toBeTruthy();
        await expect(clientBranchEl.btnSearch()).toBeTruthy();

        for (let i = 0; i < brMem.length; i++) {
            let trxWeight = String(util.getRandomNumFloat());
            let afgPlasticType = brMem[i][1];

            await page.click(clientBranchEl.txtSearchPhone());
            await page.type(clientBranchEl.txtSearchPhone(), String(brMem[i][0]));
            await page.click(clientBranchEl.btnSearch());
            await page.click(clientBranchEl.brMemberPhone(0));
            await expect(clientBranchEl.btnBrExchange(0)).toBeTruthy();
            await page.click(clientBranchEl.btnBrExchange(0));
            await page.click(clientBranchEl.tabAllItems(1));
            await expect(clientBranchEl.btnWeighScale(0)).toBeTruthy();

            switch(afgPlasticType) {
                case 'Mixed Plastic':
                    await page.click(clientBranchEl.btnWeighScale(i));
                    console.log("\tCollection Point branch transacts to member - afg Plastic:", afgPlasticType);
                    break;
                case 'HDPE-Mixed':
                    await page.click(clientBranchEl.btnWeighScale(i));
                    console.log("\tCollection Point branch transacts to member - afg Plastic:", afgPlasticType);
                    break;
                case 'PET-Mixed':
                    await page.click(clientBranchEl.btnWeighScale(i));
                    console.log("\tCollection Point branch transacts to member - afg Plastic:", afgPlasticType);
                    break;
                case 'PP-Mixed':
                    await page.click(clientBranchEl.btnWeighScale(i));
                    console.log("\tCollection Point branch transacts to member - afg Plastic:", afgPlasticType);
                    break;
                case 'PS-Mixed':
                    await page.click(clientBranchEl.btnWeighScale(i));
                    console.log("\tCollection Point branch transacts to member - afg Plastic:", afgPlasticType);
                    break;
                case 'LDPE-Mixed':
                    await page.click(clientBranchEl.btnWeighScale(i));
                    console.log("\tCollection Point branch transacts to member - afg Plastic:", afgPlasticType);
                    break;
                case 'PVC-Mixed':
                    await page.click(clientBranchEl.btnWeighScale(i));
                    console.log("\tCollection Point branch transacts to member - afg Plastic:", afgPlasticType);
                    break;
                case 'ABS-Mixed':
                    await page.click(clientBranchEl.btnWeighScale(i));
                    console.log("\tCollection Point branch transacts to member - afg Plastic:", afgPlasticType);
                    break;
                case 'Caps-Mixed':
                    await page.click(clientBranchEl.btnWeighScale(i));
                    console.log("\tCollection Point branch transacts to member - afg Plastic:", afgPlasticType);
                    break;
                case 'MALUTONG':
                    await page.click(clientBranchEl.btnWeighScale(i));
                    console.log("\tCollection Point branch transacts to member - afg Plastic:", afgPlasticType);
                    break;
                case 'MONOBLOCK-Colored':
                    await page.click(clientBranchEl.btnWeighScale(i));
                    console.log("\tCollection Point branch transacts to member - afg Plastic:", afgPlasticType);
                    break;
                default:
                    await page.click(clientBranchEl.btnWeighScale(i));
                    console.log('\tCollection Point branch transacts to member - ' + afgPlasticType + ' - Afg Plastic which maybe customly added');
            }

            await expect(clientBranchEl.txtKgValue()).toBeTruthy();
            await page.click(clientBranchEl.txtKgValue());
            await page.fill(clientBranchEl.txtKgValue(), trxWeight);
            await page.click(clientBranchEl.btnBrExchange(2));
            await page.click(clientBranchEl.btnBrExchange(1));
            await page.click(clientBranchEl.btnBrExchange(2));
            await expect(clientBranchEl.modalBtnOK(0)).toBeTruthy();
            await page.click(clientBranchEl.modalBtnOK(0));
            await expect(clientBranchEl.brMemberPhone(0)).toBeTruthy();

            trxInfo.push({
                memberOfBr : brMem[i][0] + ',' + brMem[i][1],
                weight     : trxWeight
            });
        }

        return trxInfo;
    }

    async trxToBranch(page, branchMem, expect) {
        let brMem   = branchMem.connected_branches;
        let trxInfo = [];

        await util.delay();
        await expect(clientBranchEl.txtSearchPhone()).toBeTruthy();
        await expect(clientBranchEl.btnSearch()).toBeTruthy();

        for (let i = 0; i < brMem.length; i++) {
            let trxWeight = String(util.getRandomNumFloat());
            let afgPlasticType = brMem[i][1];

            await page.click(clientBranchEl.txtSearchPhone());
            await page.type(clientBranchEl.txtSearchPhone(), String(brMem[i][0]));
            await page.click(clientBranchEl.btnSearch());
            await page.click(clientBranchEl.brMemberPhone(0));
            await expect(clientBranchEl.btnBrExchange(0)).toBeTruthy();
            await page.click(clientBranchEl.btnBrExchange(0));
            await page.click(clientBranchEl.tabAllItems(1));
            await expect(clientBranchEl.btnWeighScale(0)).toBeTruthy();

            switch(afgPlasticType) {
                case 'Mixed Plastic':
                    await page.click(clientBranchEl.btnWeighScale(i));
                    console.log("\tCollection Point branch transacts to branch - Afg Plastic:", afgPlasticType);
                    break;
                case 'HDPE-Mixed':
                    await page.click(clientBranchEl.btnWeighScale(i));
                    console.log("\tCollection Point branch transacts to branch - Afg Plastic:", afgPlasticType);
                    break;
                case 'PET-Mixed':
                    await page.click(clientBranchEl.btnWeighScale(i));
                    console.log("\tCollection Point branch transacts to branch - Afg Plastic:", afgPlasticType);
                    break;
                case 'PP-Mixed':
                    await page.click(clientBranchEl.btnWeighScale(i));
                    console.log("\tCollection Point branch transacts to branch - Afg Plastic:", afgPlasticType);
                    break;
                case 'PS-Mixed':
                    await page.click(clientBranchEl.btnWeighScale(i));
                    console.log("\tCollection Point branch transacts to branch - Afg Plastic:", afgPlasticType);
                    break;
                case 'LDPE-Mixed':
                    await page.click(clientBranchEl.btnWeighScale(i));
                    console.log("\tCollection Point branch transacts to branch - Afg Plastic:", afgPlasticType);
                    break;
                case 'PVC-Mixed':
                    await page.click(clientBranchEl.btnWeighScale(i));
                    console.log("\tCollection Point branch transacts to branch - Afg Plastic:", afgPlasticType);
                    break;
                case 'ABS-Mixed':
                    await page.click(clientBranchEl.btnWeighScale(i));
                    console.log("\tCollection Point branch transacts to branch - Afg Plastic:", afgPlasticType);
                    break;
                case 'Caps-Mixed':
                    await page.click(clientBranchEl.btnWeighScale(i));
                    console.log("\tCollection Point branch transacts to branch - Afg Plastic:", afgPlasticType);
                    break;
                case 'MALUTONG':
                    await page.click(clientBranchEl.btnWeighScale(i));
                    console.log("\tCollection Point branch transacts to branch - Afg Plastic:", afgPlasticType);
                    break;
                case 'MONOBLOCK-Colored':
                    await page.click(clientBranchEl.btnWeighScale(i));
                    console.log("\tCollection Point branch transacts to branch - Afg Plastic:", afgPlasticType);
                    break;
                default:
                    await page.click(clientBranchEl.btnWeighScale(i));
                    console.log('\tCollection Point branch transacts to branch - ' + afgPlasticType + ' - Afg Plastic which maybe customly added');
            }

            await expect(clientBranchEl.txtKgValue()).toBeTruthy();
            await page.click(clientBranchEl.txtKgValue());
            await page.fill(clientBranchEl.txtKgValue(), trxWeight);
            await page.click(clientBranchEl.btnBrExchange(2));
            await page.click(clientBranchEl.btnBrExchange(1));
            await page.click(clientBranchEl.btnBrExchange(2));
            await expect(clientBranchEl.modalBtnOK(0)).toBeTruthy();
            await page.click(clientBranchEl.modalBtnOK(0));
            await expect(clientBranchEl.brMemberPhone(0)).toBeTruthy();

            trxInfo.push({
                memberOfBr : brMem[i][0] + ',' + brMem[i][1],
                weight     : trxWeight
            });
        }

        return trxInfo;
    }

    async brTrxMember(page, expect, brMember) {
        let trxWeight = String(util.getRandomNumFloat());
        let mem       = String(brMember.member);
        let trxInfo   = [];

        await expect(clientBranchEl.brMemberPhone(0)).toBeTruthy();
        await page.click(clientBranchEl.txtSearchPhone());
        await page.type(clientBranchEl.txtSearchPhone(), mem);
        await page.click(clientBranchEl.btnSearch());
        await page.click(clientBranchEl.brMemberPhone(0));
        await expect(clientBranchEl.btnBrExchange(0)).toBeTruthy();
        await page.click(clientBranchEl.btnBrExchange(0));
        await expect(clientBranchEl.btnWeighScale(0)).toBeTruthy();
        await page.click(clientBranchEl.btnWeighScale(0));
        await expect(clientBranchEl.txtKgValue()).toBeTruthy();
        await page.click(clientBranchEl.txtKgValue());
        await page.fill(clientBranchEl.txtKgValue(), trxWeight);
        await page.click(clientBranchEl.btnBrExchange(2));
        await page.click(clientBranchEl.btnBrExchange(1));
        await page.click(clientBranchEl.btnBrExchange(2));
        await expect(clientBranchEl.modalBtnOK(0)).toBeTruthy();
        await page.click(clientBranchEl.modalBtnOK(0));
        await expect(clientBranchEl.brMemberPhone(0)).toBeTruthy();

        trxInfo.push({
            mem     : mem,
            weight  : trxWeight
        });

        return trxInfo;
    }

    async trxToBranchMember(page, expect, branchMem) {
        let brMem   = branchMem.members;
        let trxInfo = [];

        for(let key in brMem) {
            await util.delay();
            await expect(clientBranchEl.txtSearchPhone()).toBeTruthy();
            await expect(clientBranchEl.btnSearch()).toBeTruthy();
            await page.click(clientBranchEl.txtSearchPhone());
            await page.type(clientBranchEl.txtSearchPhone(), String(key));
            await page.click(clientBranchEl.btnSearch());
            await page.click(clientBranchEl.brMemberPhone(0));
            await expect(clientBranchEl.btnBrExchange(0)).toBeTruthy();
            await page.click(clientBranchEl.btnBrExchange(0));
            await page.click(clientBranchEl.tabAllItems(1));
            await expect(clientBranchEl.btnWeighScale(0)).toBeTruthy();

            for(let i = 0; i < brMem[key].length; i++) {
                let trxWeight = String(util.getRandomNumFloat());
                let afgPlasticType = brMem[key][i];

                for (let j = 0; j < await page.locator(clientBranchEl.lblItemNames()).count(); j++) {
                    let item = await page.locator(clientBranchEl.lblItemName(j)).innerText();

                    if (afgPlasticType == item)
                        await page.click(clientBranchEl.lblItemName(j));
                }

                await expect(clientBranchEl.txtKgValue()).toBeTruthy();
                await page.click(clientBranchEl.txtKgValue());
                await page.fill(clientBranchEl.txtKgValue(), trxWeight);
                await page.click(clientBranchEl.btnBrExchange(2));

                trxInfo.push({
                    memberOfBr : key + ' - ' + brMem[key][i],
                    weight     : trxWeight
                });
            }

            await page.click(clientBranchEl.btnBrExchange(1));
            await page.click(clientBranchEl.btnBrExchange(2));
            await expect(clientBranchEl.modalBtnOK(0)).toBeTruthy();
            await page.click(clientBranchEl.modalBtnOK(0));
            await expect(clientBranchEl.brMemberPhone(0)).toBeTruthy();
        }

        return trxInfo;
    }

    async trxBranchToBranch(page, expect, branchMem) {
        let brMem   = branchMem.connected_branches;
        let trxInfo = [];

        for(let key in brMem) {
            await util.delay();
            await expect(clientBranchEl.txtSearchPhone()).toBeTruthy();
            await expect(clientBranchEl.btnSearch()).toBeTruthy();
            await page.click(clientBranchEl.txtSearchPhone());
            await page.type(clientBranchEl.txtSearchPhone(), String(key));
            await page.click(clientBranchEl.btnSearch());
            await page.click(clientBranchEl.brMemberPhone(0));
            await expect(clientBranchEl.btnBrExchange(0)).toBeTruthy();
            await page.click(clientBranchEl.btnBrExchange(0));
            await page.click(clientBranchEl.tabAllItems(1));
            await expect(clientBranchEl.btnWeighScale(0)).toBeTruthy();

            for(let i = 0; i < brMem[key].length; i++) {
                let trxWeight = String(util.getRandomNumFloat());
                let afgPlasticType = brMem[key][i];

                for (let j = 0; j < await page.locator(clientBranchEl.lblItemNames()).count(); j++) {
                    let item = await page.locator(clientBranchEl.lblItemName(j)).innerText();

                    if (afgPlasticType == item)
                        await page.click(clientBranchEl.lblItemName(j));
                }

                await expect(clientBranchEl.txtKgValue()).toBeTruthy();
                await page.click(clientBranchEl.txtKgValue());
                await page.fill(clientBranchEl.txtKgValue(), trxWeight);
                await page.click(clientBranchEl.btnBrExchange(2));

                trxInfo.push({
                    memberOfBr : key + ' - ' + brMem[key][i],
                    weight     : trxWeight
                });
            }

            await page.click(clientBranchEl.btnBrExchange(1));
            await page.click(clientBranchEl.btnBrExchange(2));
            await expect(clientBranchEl.modalBtnOK(0)).toBeTruthy();
            await page.click(clientBranchEl.modalBtnOK(0));
            await expect(clientBranchEl.brMemberPhone(0)).toBeTruthy();
        }

        return trxInfo;
    }

}

module.exports = new ClientBranchPage;
