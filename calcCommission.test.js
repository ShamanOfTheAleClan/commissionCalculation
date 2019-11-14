const calcCommission = require('./calcCommission');
const cashIn = require('./cashIn');
const cashOutNatural = require('./cashOutNatural');
const cashOutLegal = require('./cashOutLegal');

jest.mock('./cashIn');
jest.mock('./cashOutNatural');
jest.mock('./cashOutLegal');

test('calls cash in function', () => {
    const inputOperation = {
        type: 'cash_in',
    };
    calcCommission.calculate(inputOperation);
    expect(cashIn.calculate).toHaveBeenCalled();
});

test('calls cash out legal function', () => {
    const inputOperation = {
        type: 'cash_out',
        user_type: 'juridical',
    };
    calcCommission.calculate(inputOperation);
    expect(cashOutLegal.calculate).toHaveBeenCalled();
});

test('calls cash out natural function', () => {
    const inputOperation = {
        type: 'cash_out',
        user_type: 'natural',
    };
    calcCommission.calculate(inputOperation);
    expect(cashOutNatural.calculate).toHaveBeenCalled();
});
