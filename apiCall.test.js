const apiCall = require('./apiCall');

test('can find input file', () => {
    // console.log(apiCall.input());
    expect(apiCall.input('input.json').length).toBeGreaterThan(0);
    
});

test('does not find non-existant file', () => {
    expect(() => {
        apiCall.input('john.json')
    }).toThrow();
});