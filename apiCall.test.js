const apiCall = require('./apiCall');

beforeAll(() => {
    return urlArgument = './input.json'
})

test('can find input file', () => {
    return apiCall.input(urlArgument, {}, results => {
        expect(results.length).toBeGreaterThan(0);
    });
});