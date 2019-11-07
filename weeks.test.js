const weeks = require('./weeks');

test('takes 2016-01-01 to output 1', () => {
    expect(weeks.getWeek('2016-01-01')).toBe(1);
});

test('takes 2016-01-03 to output 1', () => {
    expect(weeks.getWeek('2016-01-03')).toBe(1);
});

test('takes 2016-01-04 to output 2', () => {
    expect(weeks.getWeek('2016-01-04')).toBe(2);
});

test('takes 2016-01-05 to output 2', () => {
    expect(weeks.getWeek('2016-01-05')).toBe(2);
});

test('takes 2016-01-15 to output 3', () => {
    expect(weeks.getWeek('2016-01-15')).toBe(3);
});

