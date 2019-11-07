const cashIn = require('./cashIn');
const cashOutNatural = require('./cashOutNatural');
const cashOutLegal = require('./cashOutLegal');
const apiCall = require('./apiCall');

const calculate = function calculateCommissionFees(inputOperation) {

    // const currency = apiCall.cashOutJuridicalConfig.min.currency;

    // if (inputOperation.operation.currency !== currency) {
    //     console.log(`User ${inputOperation.user_id} used ${inputOperation.operation.currency} instead of EUR. Calculation canceled`);

    // } else {

        if (inputOperation.type === 'cash_in') {
            console.log(cashIn.calculate(inputOperation));
        } else if (
            inputOperation.type === 'cash_out' && inputOperation.user_type === 'natural') {
            console.log(cashOutNatural.calculate(inputOperation));
        } else if (inputOperation.type === 'cash_out' && inputOperation.user_type === 'juridical') {
            console.log(cashOutLegal.calculate(inputOperation));
        }
    // }
}
exports.calculate = calculate;