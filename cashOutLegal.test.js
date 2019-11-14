const cashOutLegal = require('./cashOutLegal');

jest.mock('./configurations.js', () => {
    const testConfigs = {
        cashOutJuridicalConfig: {
            data: {
                percents: 0.3,
                min: {
                    amount: 0.5,
                    currency: "EUR"
                }
            },
            get read() {
                return this.data;
            },
        }
    }
    return testConfigs;
});

test('Calculates cash out legal fee', () => {
    const inputOperation = {
        operation: {
            amount: 200.00,
            currency: 'EUR',
        }
    }

    expect(cashOutLegal.calculate(inputOperation)).toBe('0.60');
});