const configs = require('./configurations');

const calculate = function calculateCashInFee(inputOperation) {

    const currency = configs.cashInConfig.read.max.currency;
    const percents = configs.cashInConfig.read.percents;
    const maxAmount = configs.cashInConfig.read.max.amount;

    if (inputOperation.operation.currency === currency) {
        let feeCalculated = Math.ceil(inputOperation.operation.amount * 100 * percents) / 10000;
        feeCalculated = feeCalculated > maxAmount ? maxAmount : feeCalculated;
        feeCalculated = Number.prototype.toFixed.call(feeCalculated, 2);
        
        return feeCalculated;
    } else {
        throw (`User ${inputOperation.user_id} used ${inputOperation.operation.currency} instead of EUR. Calculation canceled`);
    }

}

exports.calculate = calculate;