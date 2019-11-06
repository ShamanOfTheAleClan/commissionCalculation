const fs = require('fs');

const urlArgument = process.argv[2];

const input = JSON.parse(fs.readFileSync(urlArgument, { encoding: 'utf8' }));
const cashInConfig = JSON.parse(fs.readFileSync('./config/cash_in.json', { encoding: 'utf8' }));
const cashOutJuridicalConfig = JSON.parse(fs.readFileSync('./config/cash_out_juridical.json', { encoding: 'utf8' }));
const cashOutNaturalConfig = JSON.parse(fs.readFileSync('./config/cash_out_natural.json', { encoding: 'utf8' }));


exports.input = input;
exports.cashInConfig = cashInConfig;
exports.cashOutJuridicalConfig = cashOutJuridicalConfig;
exports.cashOutNaturalConfig = cashOutNaturalConfig;