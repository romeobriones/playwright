const colors = require( 'colors' );

class MyReporter {

    onBegin(config, suite) {
        console.log('')
        console.log('___________________________________________________________________')
        console.log('')
        console.log('')
        console.log(colors.yellow('Descript title:',suite.suites[0].suites[0].suites[0].title))
        console.log(colors.yellow(`Starting the run with ${suite.allTests().length} tests`));
        console.log('')
        console.log('___________________________________________________________________')
    }

    onTestEnd(test, result) {
        if (result.status == 'passed') {
            console.log(colors.green(`${result.status}`.toUpperCase()) + (`   | ${test.title}`));
        }
        else if (result.status == 'failed') {
            console.log(colors.magenta(`${result.status}`.toUpperCase()) + (` | ${test.title}`));
        }
        else {
            console.log((`${result.status}`.toUpperCase()) + (`  | ${test.title}`));
        }
    }

    onEnd(result) {
        if (result.status == 'passed') {
            console.log(colors.green(`Overall Test Result: ${result.status}`.toUpperCase()));
        }
        else {
            console.log(colors.magenta(`Overall Test Result: ${result.status}`.toUpperCase()));
        }
    }

}

module.exports = MyReporter;
