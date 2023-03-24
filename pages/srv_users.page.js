const srv_usersEl  = require('../elements/srv_users.element');
const srv_commonEl = require('../elements/srv_common.element');
const util         = require('../utils/utility');

class SrvUsersPage {

    async verifyAreaUsers() {
        let headerText = await srv_usersEl.userHeader().getText();

        expect(await headerText).toEqual('Users');
        expect(await srv_usersEl.userAddBtn().isPresent()).toBeTruthy();
    }

    async verifyAddUserDetailsArea() {
        let headerText = await srv_usersEl.userModalHeader().getText();

        expect(await headerText).toEqual('Add User');
    }

    async addNewUser(memberAdded) {
        let name      = memberAdded.name;
        let cCode     = memberAdded.cCode;
        let phoneNum  = memberAdded.phoneNum;
        let nth       = memberAdded.nth;
        let email     = memberAdded.email;
        let created   = memberAdded.created;
        let nthURole  = memberAdded.userRole;
        let country   = memberAdded.country;

        if(created == false)
            return {
                name     : name,
                cCode    : cCode,
                phoneNum : phoneNum,
                country  : country,
                nth      : nth,
                email    : email,
                created  : false
            }

        await util.waitUntilNotVisible(srv_commonEl.loader());
        await srv_usersEl.userAddBtn().click();
        await util.delay();
        await this.verifyAddUserDetailsArea();
        await util.delay();
        let userRole = await util.selectDropdownbyNum(srv_usersEl.userDetailSelectType(), nthURole);
        await srv_usersEl.userDetailSearch().clear().sendKeys(name);
        await util.waitUntilPresent(srv_usersEl.userDetailNameDropDown());

        if (await srv_usersEl.userDetailNameDropDownAll() > 0)
            await srv_usersEl.userDetailNameDropDown().click();
        else {
            await srv_usersEl.userCancelBtn().click();
            console.log("      Your attempt to add a user was not successfull\n      because " + name + " is not a registered member");

            return { 
                name     : name,
                cCode    : cCode,
                phoneNum : phoneNum,  
                country  : country,
                nth      : nth,
                email    : email,
                created  : false,
                userRole : userRole
            }
        }

        await util.delay();
        await srv_usersEl.userCreateBtn().click();
        await util.waitUntilNotVisible(srv_commonEl.loader());

        if (await util.waitUntilPresent(srv_usersEl.userMemberAvatar())) {
            created = true;
            console.log("    √ Then a new user with role " + userRole +  " is added from member " + cCode + phoneNum + " at " + country);
        }
        else {
            created = false;
            console.log("      Your attempt to add a user was not successfull!");
        }

        return {
            name     : name,
            cCode    : cCode,
            phoneNum : phoneNum,
            country  : country,
            nth      : nth,
            email    : email,
            created  : created,
            userRole : userRole
        }
    }

}

module.exports = new SrvUsersPage;
