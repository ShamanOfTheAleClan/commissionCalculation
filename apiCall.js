const fs = require('fs');
const http = require('http');

let cashInConfig;
let cashOutJuridicalConfig;
let cashOutNaturalConfig;

const cashInApiUrl = 'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-in';
const cashOutJuridicalApiUrl = 'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/juridical';
const cashOutNaturalApiUrl = 'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/natural';


// const getApi = async () => {
// let response = await fetch(cashInApiUrl);
// cashInConfig = await JSON.parse(response);
// }

// getApi();

// const receiveConfigs = function () {


//     // get Cash in configs
//     http.get(cashInApiUrl, (resp) => {
//         let data = '';

//         resp.on('data', (chunk) => {
//             data += chunk;
//         });

//         resp.on('end', () => {

//             cashInConfig = JSON.parse(data);
//         });

//     }).on("error", (err) => {
//         console.log("Error: " + err.message);
//     });



//     // get cash out legal configs
//     http.get(cashOutJuridicalApiUrl, (resp) => {
//         let data = '';

//         resp.on('data', (chunk) => {
//             data += chunk;
//         });

//         resp.on('end', () => {
//             cashOutJuridicalConfig = JSON.parse(data);
//         });

//     }).on("error", (err) => {
//         console.log("Error: " + err.message);
//     });



//     // get cash out natural configs
//     http.get(cashOutNaturalApiUrl, (resp) => {
//         let data = '';

//         resp.on('data', (chunk) => {
//             data += chunk;
//         });

//         resp.on('end', () => {
//             cashOutNaturalConfig = JSON.parse(data);
//         });

//     }).on("error", (err) => {
//         console.log("Error: " + err.message);
//     });
// }
// receiveConfigs();
const input = (path) => {
    const json = JSON.parse(fs.readFileSync(path, { encoding: 'utf8' }));
    return json;
}

setInterval(() => {
    console.log(cashInConfig);
    console.log(cashOutJuridicalConfig);
    console.log(cashOutNaturalConfig);
},500);


// exports.urlArgument = urlArgument;
exports.input = input;
exports.cashInConfig = cashInConfig;
exports.cashOutJuridicalConfig = cashOutJuridicalConfig;
exports.cashOutNaturalConfig = cashOutNaturalConfig;
// exports.receiveConfigs = receiveConfigs;

