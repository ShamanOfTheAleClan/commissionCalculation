const apiCall = require('./apiCall');

const calculate = function calculateCashInFee(inputOperation) {

    const currency = apiCall.cashInConfig.max.currency;
    const percents = apiCall.cashInConfig.percents;
    const maxAmount = apiCall.cashInConfig.max.amount;

    // console.log('config currency: ', currency);
    // console.log('operation currency: ', inputOperation.operation.currency);
    if (inputOperation.operation.currency === currency) {
        // console.log('match');
        let feeCalculated = Math.ceil(inputOperation.operation.amount * 100 * percents) / 10000;
        // console.log(feeCalculated);
        feeCalculated = feeCalculated > maxAmount ? maxAmount : feeCalculated;
        feeCalculated = Number.prototype.toFixed.call(feeCalculated, 2);
        
        // console.log(feeCalculated);
        return feeCalculated;
    } else {
        throw `User ${inputOperation.user_id} used ${inputOperation.operation.currency} instead of EUR. Calculation canceled`
    }

}

exports.calculate = calculate;