const cashOutNatural = require('./cashOutNatural');
const weeks = require('./weeks');

const overdraftCheck = require('./overdraftCheck');

jest.mock('./weeks.js');
weeks.getWeek.mockReturnValue(1);

beforeAll(() => { 
    weeks.weeksArray = [{weekNumber: 1, users:[]}]; 
});

jest.mock('./overdraftCheck.js');
overdraftCheck.check.mockReturnValue(3.14);

jest.mock('./configurations.js', () => {
    const testConfigs = {
        cashOutNaturalConfig: {
            data: {
                percents: 0.3,
                week_limit: {
                    amount: 1000,
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


test('Calculates cash out fee', () => {
    // const mock = jest.fn();
    // cashOutNatural.calculate(mock);
    const inputOperation = {
        date: "2016-01-06",
        user_id: 1,
        user_type: "natural",
        type: "cash_out",
        operation: {
            amount: 30000,
            currency: "EUR",
        },
    };
    cashOutNatural.calculate(inputOperation);
    expect(weeks.getWeek).toHaveBeenCalled();
    expect(overdraftCheck.check).toHaveBeenCalled();
    expect(cashOutNatural.calculate()).toBe();
});