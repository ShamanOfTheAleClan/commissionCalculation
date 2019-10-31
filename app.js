module.exports.processData = function () {
  const fs = require('fs');

  const urlArgument = process.argv[2];
  const isDebugArgument = process.argv[3];

  const input = JSON.parse(fs.readFileSync(urlArgument, { encoding: 'utf8' }));
  const cashInConfig = JSON.parse(fs.readFileSync('./config/cash_in.json', { encoding: 'utf8' }));
  const cashOutJuridicalConfig = JSON.parse(fs.readFileSync('./config/cash_out_juridical.json', { encoding: 'utf8' }));
  const cashOutNaturalConfig = JSON.parse(fs.readFileSync('./config/cash_out_natural.json', { encoding: 'utf8' }));


  // User class for week array
  class User {
    constructor(userId, operationAmount) {
      this.id = userId;
      this.amount = operationAmount;
    }
  }
  // Week class for week array
  class Week {
    constructor(weekIterationNumber) {
      this.weekNumber = weekIterationNumber;
      this.users = [];
    }
  }

  // this creates array with 54 weeks, in which every natural user's cash out operation is stored
  // to check if cash out limit is reached.
  let weeks = [];
  for (let i = 0; i < 54; i++) {
    weeks.push(new Week(i + 1));
  }



  const getWeek = function getWeekNumber(inputDate) {
    const date = new Date(inputDate.getFullYear(), 0, 1);
    return Math.ceil((((inputDate - date) / 86400000) + date.getDay() + 1) / 7) - 1;
  };


  let debugLog = [];
  const toDebugLog = function addLineToDebugLog(e) {
    Array.prototype.push.call(debugLog, e);
  }
  
  const debug = function initiateDebugMode() {

    console.log('-------------------------------------------')
    console.log('Complete log can be found in ./debugLog.txt');
    console.log('-------------------------------------------')
    console.log(debugLog);

    let outputLog = [];
    debugLog.forEach((e) => {
      Array.prototype.push.call(outputLog, e.concat('\n'));
    })
    fs.writeFile('debugLog.txt', outputLog, (error) => {
      if (error) console.log(error);
    });
  }



  // In case given input json is not array type or is empty.
  // Probably not nesseccary, but just in case.
  const checkJson = function checkIfJsonIsArray() {
    if (!Array.isArray(input)) input = Array.from(input);

    if (Object.keys(input[0]).length === 0 || input.length === 0) return 'error';
  }



  const checkOverdraft = function checkIfLimitIsExeededAndCalculateFee(user, cashOutAmount) {
    let taxableAmount;
    const limit = cashOutNaturalConfig.week_limit.amount;
    const percents = cashOutNaturalConfig.percents;

    if (user.amount > limit) {
      taxableAmount =
        cashOutAmount < (user.amount + cashOutAmount - limit) ?
          cashOutAmount :
          user.amount + cashOutAmount - limit;
    } else {
      taxableAmount = 0.00;
    }

    toDebugLog(`Cashed out this week: ${user.amount}`);
    toDebugLog(`Operation amount: ${cashOutAmount}`);
    toDebugLog(`Taxable amount: ${taxableAmount}`);

    let feeCalculated = Math.ceil(taxableAmount * 100 * percents) / 100;
    feeCalculated = Number.prototype.toFixed.call(feeCalculated, 2);
    return feeCalculated;
  }



  const cashIn = function calculateCashInFee(inputOperation) {

    const percents = cashInConfig.percents;
    const maxAmount = cashInConfig.max.amount;

    let feeCalculated = Math.ceil(inputOperation.operation.amount * 100 * percents) / 100;
    feeCalculated = feeCalculated > maxAmount ? 5.00 : feeCalculated;
    feeCalculated = Number.prototype.toFixed.call(feeCalculated, 2);
    console.log(feeCalculated);

    toDebugLog(`Operation amount: ${inputOperation.operation.amount}`)
    toDebugLog(`Calculated fee: ${feeCalculated}`);
  }



  const cashOutNatural = function calculateCashOutFeeForNaturalPerson(inputOperation) {

    const limit = cashOutNaturalConfig.week_limit.amount;
    const week = getWeek(new Date(inputOperation.date));
    const amount = inputOperation.operation.amount;
    const userId = inputOperation.user_id;
    const userExists = !!weeks[week + 1].users.filter(user => (user.id === userId)).length;
    
    toDebugLog(`Week: ${week}`);
    toDebugLog(`Current amount:  ${inputOperation.operation.amount}  Limit: ${limit}`);
    toDebugLog(`First operation this week: ${!userExists}`);
    // if has already cashed out this week
    if (userExists) {
      // - find that user 
      const thisUser = Array.prototype.find.call(weeks[week + 1].users, user => {
        return user.id === userId;
      });

      const feeCalculated = checkOverdraft(thisUser, amount);
      thisUser.amount += amount;
      console.log(feeCalculated);

      toDebugLog(`Calculated fee: ${feeCalculated}`);

    } else {
      // add new user with given id to this week
      weeks[week + 1].users.push(new User(userId, 0));

      const thisUser = Array.prototype.find.call(weeks[week + 1].users, user => {
        return user.id === userId;
      });

      const feeCalculated = checkOverdraft(thisUser, amount);
      thisUser.amount += amount;
      console.log(feeCalculated);

      toDebugLog(`Calculated fee: ${feeCalculated}`);
    }
  }



  const cashOutLegal = function calculateCashOutFeeForJuridicalPerson(inputOperation) {

    const percents = cashOutJuridicalConfig.percents;
    const minAmount = cashOutJuridicalConfig.min.amount;

    let feeCalculated = Math.ceil(inputOperation.operation.amount * 100 * percents) / 100;
    feeCalculated = feeCalculated < minAmount ? 0.50 : feeCalculated;
    feeCalculated = Number.prototype.toFixed.call(feeCalculated, 2);
    console.log(feeCalculated);

    toDebugLog(`Operation amount: ${inputOperation.operation.amount}`);
    toDebugLog(`Calculated fee: ${feeCalculated}`);

  }



  const calcCommission = function calculateCommissionFees(inputOperation) {

    toDebugLog('-------------------------------');
    toDebugLog(`User: ${inputOperation.user_id}`);
    toDebugLog(`Operation type: ${inputOperation.type}`);
    toDebugLog(`User type: ${inputOperation.user_type}`);

    const currency = cashOutJuridicalConfig.min.currency;

    if (inputOperation.operation.currency !== currency) {
      console.log(`User ${inputOperation.user_id} used ${inputOperation.operation.currency} instead of EUR. Calculation canceled`);

      toDebugLog(`!!! Wrong currency used. Used: ${inputOperation.operation.currency}`);

    } else {

      if (inputOperation.type === 'cash_in') {
        cashIn(inputOperation);
      } else if (
        inputOperation.type === 'cash_out' && inputOperation.user_type === 'natural') {
        cashOutNatural(inputOperation);
      } else if (inputOperation.type === 'cash_out' && inputOperation.user_type === 'juridical') {
        cashOutLegal(inputOperation);
      }
    }
  }



  if (urlArgument === undefined) {
    console.log('')
    console.log('Function accepts following parameters:');
    console.log('processData(<URL>, debug')
    console.log('<URL>    - specify .json to initiate commision calculations');
    console.log('debug    - execute in debug mode')
    return;
  } else {
    checkJson();
    input.forEach(calcCommission);

    if (isDebugArgument === 'debug') {
      debug();
    }
  }
};
this.processData();
