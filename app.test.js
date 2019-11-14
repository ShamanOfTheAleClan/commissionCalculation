const app = require('./app');
const apiCall = require('./apiCall');
const calcCommission = require('./calcCommission');


jest.mock('./apiCall.js');
jest.mock('./calcCommission.js');

apiCall.input.mockReturnValue([1,2,3]);



test('Initiates calculations', () => {
    expect(calcCommission.calculate).toHaveBeenCalledTimes(3);
});

test('Calls to get configs', () => {
    app.waitForConfigs();
    expect(apiCall.cashInPromise).toHaveBeenCalled();
    expect(apiCall.cashOutLegalPromise).toHaveBeenCalled();
    expect(apiCall.cashOutNaturalPromise).toHaveBeenCalled();
});

