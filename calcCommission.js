const cashIn = require('./cashIn');
const cashOutNatural = require('./cashOutNatural');
const cashOutLegal = require('./cashOutLegal');

const calculate = function calculateCommissionFees(inputOperation) {

    if (inputOperation.type === 'cash_in') {
        console.log(cashIn.calculate(inputOperation));
    } else if (
        inputOperation.type === 'cash_out' && inputOperation.user_type === 'natural') {
        console.log(cashOutNatural.calculate(inputOperation));
    } else if (inputOperation.type === 'cash_out' && inputOperation.user_type === 'juridical') {
        console.log(cashOutLegal.calculate(inputOperation));
    }
}
exports.calculate = calculate;