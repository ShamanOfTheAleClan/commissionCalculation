const apiCall = require('./apiCall');
const calcCommission = require('./calcCommission');

const urlArgument = process.argv[2];

apiCall.input(urlArgument).forEach(calcCommission.calculate);

