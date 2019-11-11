const apiCall = require('./apiCall');
const calcCommission = require('./calcCommission');

const urlArgument = process.argv[2];

// apiCall.receiveConfigs;

// const waitForApis = setInterval(() => {
//     if (apiCall.cashInConfig != undefined
//     && apiCall.cashOutJuridicalConfig != undefined
//     && apiCall.cashOutNaturalConfig != undefined) {
//         clearInterval(waitForApis);
//         apiCall.input(urlArgument).forEach(calcCommission.calculate);
//     } else {
//         console.log(apiCall.cashInConfig);
//         console.log(apiCall.cashOutJuridicalConfig);
//         console.log(apiCall.cashOutNaturalConfig);
//     }
// },1000);

const waitForConfigs = async function (){
    let configs = await apiCall.cashInPromise;
    let legalConfigs = await apiCall.cashOutLegalPromise;
    let naturalConfigs = await apiCall.cashOutNaturalPromise;

    apiCall.input(urlArgument).forEach(calcCommission.calculate);
    console.log(configs);
    console.log(legalConfigs);
    console.log(naturalConfigs);
}

waitForConfigs();



