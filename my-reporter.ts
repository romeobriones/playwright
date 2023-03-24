const colors = require('colors');
import {Reporter} from '@playwright/test/reporter';

class MyReporter implements Reporter {
  onTestEnd(test, result) {
    if (result.status == 'passed') {
      console.log(colors.green(`${result.status}`.toUpperCase()) + (`  | ${test.title}`));
    }
    else if (result.status == 'failed') {
        console.log(colors.magenta(`${result.status}`.toUpperCase()) + (`  | ${test.title}`));
    }
    else {
        console.log((`${result.status}`.toUpperCase()) + (` | ${test.title}`));
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
export default MyReporter;
