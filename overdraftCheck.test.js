const overdraftCheck = require('./overdraftCheck');

const configs = {
    percents: 0.3,
    week_limit: {
        amount: 1000,
        currency: 'EUR',
    }
}
const inputOperation1 = { 
    date: '2016-01-06',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: { 
        amount: 30000,
        currency: 'EUR',
    },
}


test();