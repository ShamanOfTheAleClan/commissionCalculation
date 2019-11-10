const cashIn = require('./cashIn');

const inputOperation1 = {
    operation: {
        amount: 200.00,
        currency: 'EUR',
    }
}

const inputOperation2 = {
    user_id: 3,
    operation: {
        amount: 200.00,
        currency: "LT",
    }
}

test('Calculates cash in fee', () => {
    expect(cashIn.calculate(inputOperation1)).toBe('0.06');
});

test('Throws error because of bad currency', () => {
    expect(() => {
        cashIn.calculate(inputOperation2);
    }).toThrow();
});