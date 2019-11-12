const fs = require('fs');
const http = require('http');
const configurations = require('./configurations');

let cashInConfig;
let cashOutJuridicalConfig;
let cashOutNaturalConfig;

const cashInApiUrl = 'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-in';
const cashOutJuridicalApiUrl = 'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/juridical';
const cashOutNaturalApiUrl = 'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/natural';


    // get Cash in configs
const cashInPromise = () => new Promise((resolve, reject) => {
    http.get(cashInApiUrl, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });
            resp.on('end', function dataReceived() {
                cashInConfig = JSON.parse(data);
                configurations.cashInConfig.write = cashInConfig;
                resolve(cashInConfig);
            });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
        reject(console.log('Error getting cash in configs'));
    });
    
});





const cashOutLegalPromise = () => new Promise((resolve, reject) => {
    // get cash out legal configs
    http.get(cashOutJuridicalApiUrl, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            cashOutJuridicalConfig = JSON.parse(data);
            configurations.cashOutJuridicalConfig.write = cashOutJuridicalConfig;
            resolve(cashOutJuridicalConfig);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
        reject(console.log('Error getting cash out legal configs'))
    });
});





const cashOutNaturalPromise = () => new Promise((resolve, reject) => {
    // get cash out natural configs
    http.get(cashOutNaturalApiUrl, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            cashOutNaturalConfig = JSON.parse(data);
            configurations.cashOutNaturalConfig.write = cashOutNaturalConfig;
            resolve(cashOutNaturalConfig);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
});


const input = (path) => {
    const json = JSON.parse(fs.readFileSync(path, { encoding: 'utf8' }));
    // console.log(json);
    return json;
}


exports.input = input;
exports.cashInPromise = cashInPromise;
exports.cashOutLegalPromise = cashOutLegalPromise;
exports.cashOutNaturalPromise = cashOutNaturalPromise;


