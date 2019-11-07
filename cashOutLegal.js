const apiCall = require('./apiCall');

const calculate = function calculateCashOutFeeForJuridicalPerson(inputOperation) {

    const percents = apiCall.cashOutJuridicalConfig.percents;
    const minAmount = apiCall.cashOutJuridicalConfig.min.amount;

    let feeCalculated = Math.ceil(inputOperation.operation.amount * 100 * percents) / 10000;
    feeCalculated = feeCalculated < minAmount ? minAmount : feeCalculated;
    feeCalculated = Number.prototype.toFixed.call(feeCalculated, 2);
    // console.log(feeCalculated);
    return feeCalculated;
}

exports.calculate = calculate;