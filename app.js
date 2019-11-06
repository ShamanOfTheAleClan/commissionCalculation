const apiCall = require('./apiCall');
const calcCommission = require('./calcCommission');


 apiCall.input.forEach(calcCommission.calculate);

