const cashIn = require('./cashIn');

jest.mock('./configurations.js', () => {
    const testConfigs = {
        cashInConfig: {
            data: {
                percents: 0.03,
                max: {
                    amount: 5,
                    currency: "EUR",
                },
            },
            get read() {
                return this.data;
            },
        }
    }
    return testConfigs;
});


test('Calculates cash in fee', () => {
    const inputOperation = {
        operation: {
            amount: 200.00,
            currency: 'EUR',
        }
    }

    expect(cashIn.calculate(inputOperation)).toBe('0.06');
});

test('Throws error because of bad currency', () => {
    const inputOperation = {
        user_id: 3,
        operation: {
            amount: 200.00,
            currency: "LT",
        }
    }

    expect(() => {
        cashIn.calculate(inputOperation);
    }).toThrow();
});