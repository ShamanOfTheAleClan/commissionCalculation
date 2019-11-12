const configs = require('./configurations');

const check = function checkIfLimitIsExeededAndCalculateFee(user, cashOutAmount) {
    let taxableAmount;
    const limit = configs.cashOutNaturalConfig.read.week_limit.amount;
    const percents = configs.cashOutNaturalConfig.read.percents;

    if (user.amount + cashOutAmount > limit) {
        taxableAmount =
            cashOutAmount < (user.amount + cashOutAmount - limit) ?
                cashOutAmount :
                user.amount + cashOutAmount - limit;
    } else {
        taxableAmount = 0.00;
    }

    let feeCalculated = Math.ceil(taxableAmount * 100 * percents) / 10000;
    feeCalculated = Number.prototype.toFixed.call(feeCalculated, 2);
    return feeCalculated;
}

exports.check = check;