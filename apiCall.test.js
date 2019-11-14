const apiCall = require('./apiCall');
const fs = require('fs');
const http = require('http');

jest.mock('fs');
jest.mock('http');
jest.mock('./configurations.js', () => {
    const testConfigs = {
        cashInConfig: {
            data: undefined,
            set write(information) {
                this.data = information;
            },
        }
    }
    return testConfigs;
});


test('processes given json file', () => {
    fs.readFileSync.mockReturnValue('{"foo": "bar"}');

    const mock = jest.fn();
    apiCall.input(mock);
    expect(fs.readFileSync).toHaveBeenCalled();
});

test.skip('fetches json from API', () => {
    http.get.mockReturnValue('test');

    const mock = jest.fn();
    // apiCall.cashInPromise(mock);
    // http.get(mock);

    return apiCall.cashInPromise(mock).then(() => {
        expect(http.get).toHaveBeenCalled();
    })
});