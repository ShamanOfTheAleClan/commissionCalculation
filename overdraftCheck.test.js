const overdraftCheck = require('./overdraftCheck');

jest.mock('./configurations.js', () => {
    const testConfigs = {
        cashOutNaturalConfig: {
            data: {
                percents: 0.3,
                week_limit: {
                    amount: 1000,
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


test('returns calculated fee', () => {
    let user = {
        amount: 0,
        id: 1,
    };
    expect(overdraftCheck.check(user, 30000)).toBe('87.00');
});

test('returns 0 when limit is not reached', () => {
    let user = {
        amount: 0,
        id: 1,
    };
    expect(overdraftCheck.check(user, 30)).toBe('0.00');
});





