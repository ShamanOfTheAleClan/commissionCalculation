const cashIn = require('./cashIn');

test.skip('From 200.00 calcualtes 0.06', () => {
    expect(cashIn.calculate({operation:'200.00'})).toBe(0.06);
});