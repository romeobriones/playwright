const {devices} = require('@playwright/test')
const settings  = {path: '.env', defaults: '.env.defaults'}

require('dotenv-defaults').config(settings)

const baseURL        = process.env.BASE_URL
const browserName    = process.env.BROWSERNAME
const headless       = false
const screenshot     = process.env.SCREENSHOT
const retries        = process.env.RETRIES
const isMobile       = process.env.ISMOBILE === 'true'
const parallel       = process.env.PARALLEL === 'true'
const workers        = parseInt(process.env.WORKERS)
const viewportWidth  = parseInt(process.env.VIEWPORTWIDTH)
const viewportHeight = parseInt(process.env.VIEWPORTHEIGHT)
const viewport       = null;

let reporterStr = process.env.REPORTER,
    reporter = [],
    numOfMultiProp = 0,
    prop

const reporterArr = reporterStr.split(",")

for (let i = 0; i < reporterArr.length; i++) {
    let reporterName = reporterArr[i].trim();
    if (reporterName.substring(0, 1) === "-") {
        ++numOfMultiProp;
        if (reporterArr[i - 1] === "list") prop = "printSteps";
        else if (reporterArr[i - 1] === "html") prop = "outputFolder";
        else prop = "outputFile";
        reporter[i - numOfMultiProp].push({
            [prop]: reporterName.substring(1, reporterName.length),
        });
    } else reporter.push([reporterName]);
}

const configDesktop = {
    use: {
        retries,
        headless: true,
        baseURL,
        browserName,
        screenshot,
        viewport,
        launchOptions: {
            args: [
                "--start-maximized",
                "--disable-extension",
                "--disable-gpu",
                "--proxy-server='direct://'",
                "--proxy-bypass-list=*",
                //"--window-size=1920,1040"
            ],
        },
    },
    workers: 3,
    parallel: true,
    timeout: 320000,
    reporter
};

const configMobile = {
    use: {
        retries,
        headless,
        baseURL,
        screenshot,
        ...devices[ 'Pixel 5' ],
    },
    workers,
    parallel,
    timeout: 320000,
    reporter
};

(() => {
    if(isMobile) {
        module.exports = configMobile;
        console.log('Running Mobile..........');
    }
    else {
        module.exports = configDesktop;
        console.log(process.env.ISMOBILE)
        console.log('Running Desktop..........');
    }
})();
