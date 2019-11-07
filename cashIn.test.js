const cashIn = require('./cashIn');

const inputOperation1 = {
    operation: {
        amount: 200.00,
        currency: 'EUR',
    }
}

test('Calculates cash in fee', () => {
    expect(cashIn.calculate(inputOperation1)).toBe(0.06);
});