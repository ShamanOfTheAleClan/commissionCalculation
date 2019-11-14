const configs = require('./configurations');

test('write data into object', () => {
    configs.cashInConfig.write = 'test';
    expect(configs.cashInConfig.data).toBe('test');
});

test('reads data from object', () => {
    configs.cashInConfig.write = 'test';
    expect(configs.cashInConfig.read).toBe('test');
});