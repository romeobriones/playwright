const {test, expect} = require('@playwright/test');
const fs             = require('fs-extra');

const client_commonPage     = require('../pages/client_common.page');
const client_registerPage   = require('../pages/client_register.page');
const client_branchPage     = require('../pages/client_branch.page');
const client_processorPage  = require('../pages/client_processor.page');
const client_aggregatorPage = require('../pages/client_aggregator.page');

let outputMembers = './outputs/clientMembers.json';
let outputTrx     = './outputs/trx.json'

const addMem      = require('../data/2001.json');
const addBr       = require('../data/2002.json');
const addPr       = require('../data/2003.json');
const addAg       = require('../data/2004.json');
const brMember    = require('../data/2005.json');
const prMember    = require('../data/2006.json');
const agMember    = require('../data/2007.json');
const brCPointTrx = require('../data/2008.json');
const brBrTrx     = require('../data/2009.json');
const prBrTrx     = require('../data/2010.json');
const agBrTrx     = require('../data/2011.json');

let createdMember     = {};
let createdBranch     = {};
let createdProcessor  = {};
let createdAggregator = {};
let addedBrMember     = {};
let addedAgMember     = {};
let addedPrMember     = {};
let addedBrTrx        = {};
let addedBrBrTrx      = {};
let addedPrBrTrx      = {};
let addedAgBrTrx      = {};

let addMember     = [addMem.Afghanistan];
let addBranch     = [addBr.Afghanistan.Collection_Point];
let addProcessor  = [addPr.Afghanistan];
let addAggregator = [addAg.Afghanistan];
let brMembers     = [
    brMember.Collection_Point,
    brMember.Collection_Point_Another
];
let prMembers = [prMember.Processor, prMember.Processor_Another];
let agMembers = [agMember.Aggregator, agMember.Aggregator_Another];
let brTrx     = [
    brCPointTrx.BrCP_Three,
    brCPointTrx.BrCooP_Two,
    brCPointTrx.Workplace_Program_Two,
    brCPointTrx.School_Program_Two,
    brCPointTrx.Faith_Program_Two
];
let brToBrTrx = [brBrTrx.BrCP_Two];
let prToBrTrx = [prBrTrx.Pr_One, prBrTrx.Pr_Two];
let agToBrTrx = [agBrTrx.Ag_One, agBrTrx.Ag_Two];

test.describe('Client Operations', () => {

    test('User registers from client app as collector @2001', async ({page}) => {
        for (let i = 0; i < addMember.length; i++) {
            await test.step('When user opens plasticBank client app', async () => {
                await page.goto(process.env.CLIENTURL);
            });
            await test.step('Then landing page is displayed', async () => {
                await client_commonPage.verifyLandingPage(expect);
            });
            await test.step('When user taps signup', async () => {
                await client_commonPage.clickSignUp(page);
            });
            await test.step('Then user can register as a collector', async () => {
                await client_commonPage.verifyBecomeMember(page, expect);
            });
            await test.step('When user taps collecor', async () => {
                await client_registerPage.registerCollector(page);
            });
            await test.step('Then user can register a new account', async () => {
                await client_registerPage.verifyBecomeCollector(expect);
            });
            await test.step('When user taps Become Collector', async () => {
                await client_registerPage.tapBecomeCollector(page);
            });
            await test.step('Then user can create profile', async () => {
                await client_registerPage.verifyCreateProfile(expect);
            });
            await test.step('When user inputs profile data', async () => {
                createdMember = await client_registerPage.createNewAcct(page, addMember[i], expect);
                fs.appendFileSync(outputMembers, '\"' + createdMember.cellNum + '\" : ' + JSON.stringify(createdMember) + ',\n');
            });
            if (createdMember) {
                await test.step('Then verify phone header appears', async () => {
                    await client_registerPage.verifyPhoneHeader(expect);
                });
                await test.step('When member skips verify phone', async () => {
                    await client_registerPage.tapSkipVerifyPhone(page);
                });
                await test.step('Then member dashboard is displayed', async () => {
                    await client_commonPage.verifyDashboard(expect);
                });
                await test.step('When member logouts', async () => {
                    await client_commonPage.logout(page);
                });
            }
        }
        await test.step('Then browser is closed and test ends', async () => {
            await page.close();
        });
    });

    test('User registers from client app as branch @2002', async ({page}) => {
        for (let i = 0; i < addBranch.length; i++) {
            await test.step('When user opens plasticBank client app', async () => {
                await page.goto(process.env.CLIENTURL);
            });
            await test.step('Then landing page is displayed', async () => {
                await client_commonPage.verifyLandingPage(expect);
            });
            await test.step('When user taps signup', async () => {
                await client_commonPage.clickSignUp(page);
            });
            await test.step('Then user can register as a collector', async () => {
                await client_commonPage.verifyBecomeMember(page, expect);
            });
            await test.step('When user taps collecor', async () => {
                await client_registerPage.registerCollector(page);
            });
            await test.step('Then user can register a new account', async () => {
                await client_registerPage.verifyBecomeCollector(expect);
            });
            await test.step('When user taps Become Collector', async () => {
                await client_registerPage.tapBecomeCollector(page);
            });
            await test.step('Then user can create profile', async () => {
                await client_registerPage.verifyCreateProfile(expect);
            });
            await test.step('When user inputs profile data', async () => {
                createdBranch = await client_registerPage.createNewAcct(page, addBranch[i], expect);
                createdBranch.type =  addBranch[i].type;
            });
            if (createdBranch) {
                await test.step('Then verify phone header appears', async () => {
                    await client_registerPage.verifyPhoneHeader(expect);
                });
                await test.step('When member skips verify phone', async () => {
                    await client_registerPage.tapSkipVerifyPhone(page);
                });
                await test.step('Then member dashboard is displayed', async () => {
                    await client_commonPage.verifyDashboard(expect);
                });
                await test.step('When member creates a branch business', async () => {
                    createdBranch = await client_branchPage.createBusinessBranch(page, createdBranch);
                    fs.appendFileSync(outputMembers, '\"' + "Member " + createdBranch.cellNum + " is created" + '\" : ' + JSON.stringify(createdBranch) + ',\n');
                });
                await test.step('Then account is now a branch type', async () => {
                    await client_branchPage.verifyNewAcctCreated(expect);
                });
            }
            await test.step('When member logouts', async () => {
                await client_commonPage.logOff(page);
            });
        }
        await test.step('Then browser is closed and test ends', async () => {
            await page.close();
        });
    });

    test('User registers from client app as processor @2003', async ({page}) => {
        for (let i = 0; i < addProcessor.length; i++) {
            await test.step('When user opens plasticBank client app', async () => {
                await page.goto(process.env.CLIENTURL);
            });
            await test.step('Then landing page is displayed', async () => {
                await client_commonPage.verifyLandingPage(expect);
            });
            await test.step('When user taps signup', async () => {
                await client_commonPage.clickSignUp(page);
            });
            await test.step('Then user can register as a collector', async () => {
                await client_commonPage.verifyBecomeMember(page, expect);
            });
            await test.step('When user taps collecor', async () => {
                await client_registerPage.registerCollector(page);
            });
            await test.step('Then user can register a new account', async () => {
                await client_registerPage.verifyBecomeCollector(expect);
            });
            await test.step('When user taps Become Collector', async () => {
                await client_registerPage.tapBecomeCollector(page);
            });
            await test.step('Then user can create profile', async () => {
                await client_registerPage.verifyCreateProfile(expect);
            });
            await test.step('When user inputs profile data', async () => {
                createdProcessor      = await client_registerPage.createNewAcct(page, addProcessor[i], expect);
                createdProcessor.type = addProcessor[i].type;
            });
            if (createdProcessor) {
                await test.step('Then verify phone header appears', async () => {
                    await client_registerPage.verifyPhoneHeader(expect);
                });
                await test.step('When member skips verify phone', async () => {
                    await client_registerPage.tapSkipVerifyPhone(page);
                });
                await test.step('Then member dashboard is displayed', async () => {
                    await client_commonPage.verifyDashboard(expect);
                });
                await test.step('When member creates a processor business', async () => {
                    createdProcessor = await client_processorPage.createBusinessProcessor(page, createdProcessor);
                    fs.appendFileSync(outputMembers, '\"' + createdProcessor.cellNum + '\" : ' + JSON.stringify(createdProcessor) + ',\n');
                });
                await test.step('Then account is now a processor type', async () => {
                    await client_processorPage.verifyCreatedProcessor(expect);
                });
            }
            await test.step('When member logouts', async () => {
                await client_commonPage.logOff(page);
            });
        }
        await test.step('Then browser is closed and test ends', async () => {
            await page.close();
        });
    });

    test('User registers from client app as aggregator @2004', async ({page}) => {
        for (let i = 0; i < addAggregator.length; i++) {
            await test.step('When user opens plasticBank client app', async () => {
                await page.goto(process.env.CLIENTURL);
            });
            await test.step('Then landing page is displayed', async () => {
                await client_commonPage.verifyLandingPage(expect);
            });
            await test.step('When user taps signup', async () => {
                await client_commonPage.clickSignUp(page);
            });
            await test.step('Then user can register as a collector', async () => {
                await client_commonPage.verifyBecomeMember(page, expect);
            });
            await test.step('When user taps collecor', async () => {
                await client_registerPage.registerCollector(page);
            });
            await test.step('Then user can register a new account', async () => {
                await client_registerPage.verifyBecomeCollector(expect);
            });
            await test.step('When user taps Become Collector', async () => {
                await client_registerPage.tapBecomeCollector(page);
            });
            await test.step('Then user can create profile', async () => {
                await client_registerPage.verifyCreateProfile(expect);
            });
            await test.step('When user inputs profile data', async () => {
                createdAggregator = await client_registerPage.createNewAcct(page, addAggregator[i], expect);
            });
            if (createdAggregator) {
                await test.step('Then verify phone header appears', async () => {
                    await client_registerPage.verifyPhoneHeader(expect);
                });
                await test.step('When member skips verify phone', async () => {
                    await client_registerPage.tapSkipVerifyPhone(page);
                });
                await test.step('Then member dashboard is displayed', async () => {
                    await client_commonPage.verifyDashboard(expect);
                });
                await test.step('When member creates an aggregator business', async () => {
                    createdAggregator = await client_aggregatorPage.createBusinessAggregator(page, createdAggregator);
                    fs.appendFileSync(outputMembers, '\"' + createdAggregator.cellNum + '\" : ' + JSON.stringify(createdAggregator) + ',\n');
                });
                await test.step('Then account is now an aggregator type', async () => {
                    await client_aggregatorPage.verifyCreatedAggregator(expect);
                });
            }
            await test.step('When member logouts', async () => {
                await client_commonPage.logOff(page);
            });
        }
        await test.step('Then browser is closed and test ends', async () => {
            await page.close();
        });
    });

    test('Member-branch registers his own members @2005', async ({page}) => {
        for (let i = 0; i < brMembers.length; i++) {
            await test.step('When user opens plasticBank client app', async () => {
                await page.goto(process.env.CLIENTURL);
            });
            await test.step('Then landing page is displayed', async () => {
                await client_commonPage.verifyLandingPage(expect);
            });
            await test.step('When user taps login', async () => {
                await client_commonPage.clickLogin(page);
            });
            await test.step('Then user can login', async () => {
                await client_commonPage.verifyLoginArea(expect);
            });
            await test.step('When user logs-in', async () => {
                await client_commonPage.login(page, brMembers[i].cellNum, brMembers[i].password);
            });
            await test.step('Then dashboard area is displayed', async () => {
                await client_commonPage.verifyDashboard(expect);
            });
            await test.step('When user inputs profile data of his member', async () => {
                addedBrMember = await client_branchPage.addMember(page, brMembers[i], expect);
                console.log(addedBrMember)
            });
            await test.step('Then members are successfully registered by branch-member', async () => {
                fs.appendFileSync(outputMembers, '\"' + "Members of " + brMembers[i].type + " " + brMembers[i].cellNum + '\" : ' + JSON.stringify(addedBrMember) + ',\n');
            });
            await test.step('When member logouts', async () => {
                await client_commonPage.logOff(page);
            });
        }
        await test.step('Then browser is closed and test ends', async () => {
            await page.close();
        });
    });

    test('Processor registers his own members @2006', async ({page}) => {
        for (let i = 0; i < prMembers.length; i++) {
            await test.step('When user opens plasticBank client app', async () => {
                await page.goto(process.env.CLIENTURL);
            });
            await test.step('Then landing page is displayed', async () => {
                await client_commonPage.verifyLandingPage(expect);
            });
            await test.step('When user taps login', async () => {
                await client_commonPage.clickLogin(page);
            });
            await test.step('Then user can login', async () => {
                await client_commonPage.verifyLoginArea(expect);
            });
            await test.step('When user logs-in', async () => {
                await client_commonPage.login(page, prMembers[i].cellNum, prMembers[i].password);
            });
            await test.step('Then dashboard area is displayed', async () => {
                await client_commonPage.verifyDashboard(expect);
            });
            await test.step('When user taps his number from menu', async () => {
                await client_processorPage.tapProcessorNumber(page);
            });
            await test.step('Then user can add members', async () => {
                await client_processorPage.verifyCanAddMember(expect);
            });
            await test.step('When user inputs profile data of his member', async () => {
                addedPrMember = await client_processorPage.addMember(page, prMembers[i], expect);
            });
            await test.step('Then members are successfully registered by branch-member', async () => {
                fs.appendFileSync(outputMembers, '\"' + "Members of " + prMembers[i].type + " " + prMembers[i].cellNum + '\" : ' + JSON.stringify(addedPrMember) + ',\n');
            });
            await test.step('When member logouts', async () => {
                await client_commonPage.logOff(page);
            });
        }
        await test.step('Then browser is closed and test ends', async () => {
            await page.close();
        });
    });

    test('Member-aggregator registers his own members @2007', async ({page}) => {
        for (let i = 0; i < agMembers.length; i++) {
            await test.step('When user opens plasticBank client app', async () => {
                await page.goto(process.env.CLIENTURL);
            });
            await test.step('Then landing page is displayed', async () => {
                await client_commonPage.verifyLandingPage(expect);
            });
            await test.step('When user taps login', async () => {
                await client_commonPage.clickLogin(page);
            });
            await test.step('Then user can login', async () => {
                await client_commonPage.verifyLoginArea(expect);
            });
            await test.step('When user logs-in', async () => {
                await client_commonPage.login(page, agMembers[i].cellNum, agMembers[i].password);
            });
            await test.step('Then dashboard area is displayed', async () => {
                await client_commonPage.verifyDashboard(expect);
            });
            await test.step('When user inputs profile data of his member', async () => {
                addedAgMember = await client_aggregatorPage.addMember(page, agMembers[i], expect);
            });
            await test.step('Then members are successfully registered by branch-member', async () => {
                fs.appendFileSync(outputMembers, '\"' + "Members of " + agMembers[i].type + " " + agMembers[i].cellNum + '\" : ' + JSON.stringify(addedAgMember) + ',\n');
            });
            await test.step('When member logouts', async () => {
                await client_commonPage.logOff(page);
            });
        }
        await test.step('Then browser is closed and test ends', async () => {
            await page.close();
        });
    });

    test('Branch transacts on his members @2008', async ({page}) => {
        for (let i = 0; i < brTrx.length; i++) {
            await test.step('When a member-branch opens plasticBank client app', async () => {
                await page.goto(process.env.CLIENTURL);
            });
            await test.step('Then landing page is displayed', async () => {
                await client_commonPage.verifyLandingPage(expect);
            });
            await test.step('When member-branch taps login', async () => {
                await client_commonPage.clickLogin(page);
            });
            await test.step('Then member-branch can login', async () => {
                await client_commonPage.verifyLoginArea(expect);
            });
            await test.step('When member-branch logs-in', async () => {
                await client_commonPage.login(page, brTrx[i].cellNum, brTrx[i].password);
            });
            await test.step('Then dashboard area is displayed', async () => {
                await client_commonPage.verifyDashboard(expect);
            });
            await test.step('When member-branch transacts to its members', async () => {
                addedBrTrx = await client_branchPage.transactToMem(page, expect, brTrx[i]);
                fs.appendFileSync(outputTrx, '\"' + brTrx[i].brType + " branch " + brTrx[i].cellNum + " transacts with his members " + '\" : ' + JSON.stringify(addedBrTrx) + ',\n');
            });
            await test.step('When member-branch logouts', async () => {
                await client_commonPage.logOff(page);
            });
        }
        await test.step('Then browser is closed and test ends', async () => {
            await page.close();
        });
    });

    test('Branch transacts on other branch @2009', async ({page}) => {
        for (let i = 0; i < brToBrTrx.length; i++) {
            await test.step('When a member-branch opens plasticBank client app', async () => {
                await page.goto(process.env.CLIENTURL);
            });
            await test.step('Then landing page is displayed', async () => {
                await client_commonPage.verifyLandingPage(expect);
            });
            await test.step('When member-branch taps login', async () => {
                await client_commonPage.clickLogin(page);
            });
            await test.step('Then member-branch can login', async () => {
                await client_commonPage.verifyLoginArea(expect);
            });
            await test.step('When member-branch logs-in', async () => {
                await client_commonPage.login(page, brToBrTrx[i].cellNum, brToBrTrx[i].password);
            });
            await test.step('Then dashboard area is displayed', async () => {
                await client_commonPage.verifyDashboard(expect);
            });
            await test.step('When member-branch transacts to other branch', async () => {
                addedBrBrTrx = await client_branchPage.transactToBranch(page, brToBrTrx[i], expect);
                fs.appendFileSync(outputTrx, '\"' + brToBrTrx[i].brType + " branch " + brToBrTrx[i].cellNum + " transacts with other branches " + '\" : ' + JSON.stringify(addedBrBrTrx) + ',\n');
            });
            await test.step('When member-branch logouts', async () => {
                await client_commonPage.logOff(page);
            });
        }
        await test.step('Then browser is closed and test ends', async () => {
            await page.close();
        });
    });

    test('Processor transacts on branch @2010', async ({page}) => {
        for (let i = 0; i < prToBrTrx.length; i++) {
            await test.step('When a member-processor opens plasticBank client app', async () => {
                await page.goto(process.env.CLIENTURL);
            });
            await test.step('Then landing page is displayed', async () => {
                await client_commonPage.verifyLandingPage(expect);
            });
            await test.step('When member-processor taps login', async () => {
                await client_commonPage.clickLogin(page);
            });
            await test.step('Then member-processor can login', async () => {
                await client_commonPage.verifyLoginArea(expect);
            });
            await test.step('When member-processor logs-in', async () => {
                await client_commonPage.login(page, prToBrTrx[i].cellNum, prToBrTrx[i].password);
            });
            await test.step('Then dashboard area is displayed', async () => {
                await client_commonPage.verifyDashboard(expect);
            });
            await test.step('When user taps his number from menu', async () => {
                await client_processorPage.tapProcessorNumber(page);
            });
            await test.step('When member-processor transacts to other branch', async () => {
                addedPrBrTrx = await client_processorPage.transactProcessor(page, prToBrTrx[i], expect);
                fs.appendFileSync(outputTrx, '\"' + "Processor " + prToBrTrx[i].cellNum + " transacts with other branches " + '\" : ' + JSON.stringify(addedPrBrTrx) + ',\n');
            });
            await test.step('When member-processor logouts', async () => {
                await client_commonPage.logOff(page);
            });
        }
        await test.step('Then browser is closed and test ends', async () => {
            await page.close();
        });
    });

    test('Aggregator transacts on branch @2011', async ({page}) => {
        for (let i = 0; i < agToBrTrx.length; i++) {
            await test.step('When a member-aggregator opens plasticBank client app', async () => {
                await page.goto(process.env.CLIENTURL);
            });
            await test.step('Then landing page is displayed', async () => {
                await client_commonPage.verifyLandingPage(expect);
            });
            await test.step('When member-aggregator taps login', async () => {
                await client_commonPage.clickLogin(page);
            });
            await test.step('Then member-agaregator can login', async () => {
                await client_commonPage.verifyLoginArea(expect);
            });
            await test.step('When member-aggregator logs-in', async () => {
                await client_commonPage.login(page, agToBrTrx[i].cellNum, agToBrTrx[i].password);
            });
            await test.step('Then dashboard area is displayed', async () => {
                await client_commonPage.verifyDashboard(expect);
            });
            await test.step('When member-aggregator transacts to other branch', async () => {
                addedAgBrTrx = await client_aggregatorPage.transactAggregator(page, agToBrTrx[i], expect);
                fs.appendFileSync(outputTrx, '\"' + "Aggregator " + agToBrTrx[i].cellNum + " transacts with other branches " + '\" : ' + JSON.stringify(addedAgBrTrx) + ',\n');
            });
            await test.step('When member-agreggator logouts', async () => {
                await client_commonPage.logOff(page);
            });
        }
        await test.step('Then browser is closed and test ends', async () => {
            await page.close();
        });
    });

});
