const apiCall = require('./apiCall');

test.skip('can find input file', () => {
    // console.log(apiCall.input());
    expect(apiCall.input('input.json').length).toBeGreaterThan(0);
    
});

test.skip('does not find non-existant file', () => {
    expect(() => {
        apiCall.input('john.json')
    }).toThrow();
});