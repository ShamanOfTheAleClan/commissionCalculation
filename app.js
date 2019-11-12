const apiCall = require('./apiCall');
const calcCommission = require('./calcCommission');
const configurations = require('./configurations');

const urlArgument = process.argv[2];


const waitForConfigs = async function (){
    let cashInConfigs = await apiCall.cashInPromise();
    let cashOutLegalConfigs = await apiCall.cashOutLegalPromise();
    let cashOutNaturalConfigs = await apiCall.cashOutNaturalPromise();

    apiCall.input(urlArgument).forEach(calcCommission.calculate);
}

waitForConfigs();



