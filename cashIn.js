const apiCall = require('./apiCall');

const calculate = function calculateCashInFee(inputOperation) {

    const percents = apiCall.cashInConfig.percents;
    const maxAmount = apiCall.cashInConfig.max.amount;

    let feeCalculated = Math.ceil(inputOperation.operation.amount * 100 * percents) / 10000;
    feeCalculated = feeCalculated > maxAmount ? maxAmount : feeCalculated;
    feeCalculated = Number.prototype.toFixed.call(feeCalculated, 2);
    console.log(feeCalculated);

    // toDebugLog(`Operation amount: ${inputOperation.operation.amount}`)
    // toDebugLog(`Calculated fee: ${feeCalculated}`);
}

exports.calculate = calculate;