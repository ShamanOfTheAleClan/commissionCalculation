const configs = require('./configurations');

const calculate = function calculateCashOutFeeForJuridicalPerson(inputOperation) {

    const percents = configs.cashOutJuridicalConfig.read.percents;
    const minAmount = configs.cashOutJuridicalConfig.read.min.amount;

    let feeCalculated = Math.ceil(inputOperation.operation.amount * 100 * percents) / 10000;
    feeCalculated = feeCalculated < minAmount ? minAmount : feeCalculated;
    feeCalculated = Number.prototype.toFixed.call(feeCalculated, 2);
    return feeCalculated;
}

exports.calculate = calculate;