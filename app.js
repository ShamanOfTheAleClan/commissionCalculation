module.exports.processData = function () {
  const fs = require('fs');

  const urlArgument = process.argv[2];
  // const isDebugArgument = process.argv[3];
  
  const input = JSON.parse(fs.readFileSync(urlArgument, {encoding: 'utf8'}));
  const cashInConfig = JSON.parse(fs.readFileSync('./config/cash_in.json',{encoding: 'utf8'}));
  const cashOutJuridicalConfig = JSON.parse(fs.readFileSync('./config/cash_out_juridical.json',{encoding: 'utf8'}));
  const cashOutNaturalConfig = JSON.parse(fs.readFileSync('./config/cash_out_natural.json',{encoding: 'utf8'}));
  // console.log('Input: ', input);
  // console.log('Cash in configuration: ', cashInConfig);
  // console.log('Cash out juridical condifuration: ', cashOutConfig);
  // console.log('Cash out natural condifuration: ', cashOutConfig);
  
  // lets create week array to later track user overdrafts
  class User {
    constructor(userId, operationAmount) {
      this.id = userId;
      this.amount = operationAmount;
    }
  }
  class Week {
    constructor(weekIterationNumber) {
      this.weekNumber = weekIterationNumber;
      this.users = [];
    }
  }

  let weeks = [];
  for (let i = 0; i < 54; i++) {
    weeks.push(new Week(i + 1));
  }

  const getWeek = function getWeekNumber(e) {
    const date = new Date(e.getFullYear(),0,1);
    return Math.ceil((( (e - date) / 86400000) + date.getDay() + 1) / 7) - 1;
  };




  // In case given input json is not array type or is empty.
  // Probably not nesseccary, but just in case.
  const checkJson = function checkIfJsonIsArray() {
    if (!Array.isArray(input)) input = Array.from(input);
    
    if (Object.keys(input[0]).length === 0 || input.length === 0) return 'error';
  }



  const cashIn = function calculateCashInFee(e) {
    const currency = cashInConfig.max.currency;

    if (e.operation.currency !== currency) {
      console.log(`User ${e.user_id} used ${e.operation.currency} instead of EUR. Calculation canceled`);
    } else {
      // calculate fees
      const percents = cashInConfig.percents;
      const maxAmount = cashInConfig.max.amount;

      let feeCalculated = Math.ceil(e.operation.amount * 100 * percents) / 100;
      feeCalculated = feeCalculated > maxAmount ? 5.00 : feeCalculated;
      feeCalculated = Number.prototype.toFixed.call(feeCalculated, 2);
      console.log(feeCalculated);
    }
  }



  const cashOutNatural = function calculateCashOutFeeForNaturalPerson(e) {
    const currency = cashOutNaturalConfig.week_limit.currency;

    if (e.operation.currency !== currency) {
      console.log(`User ${e.user_id} used ${e.operation.currency} instead of EUR. Calculation canceled`);
    } else {
      const percents = cashOutNaturalConfig.percents;
      const limit = cashOutNaturalConfig.week_limit.amount;

      const week = getWeek(e.date);
      const amount = e.operation.amount;
      
      // get user id
      const userId = e.user_id;
      // check if this user is already in that week
      // let userExists = false;


      Object.entries(weeks[week + 1].user)
      const userExists = weeks[week + 1].users.filter(user => (user.id === userId));
      if (userExists.length === 1) {
        // if so - add amount

      } else {

        // if not - create new user in that week and add amount;
        weeks[week + 1].users.push(new User(userId, amount));
      }
        

      // if limit not exeeded - fee = 0;
      // else - calculate fee
      console.log('Calculation not yet implemented');
    }
  }




  const cashOutLegal = function calculateCashOutFeeForJuridicalPerson(e) {
    const currency = cashOutJuridicalConfig.min.currency;

    if (e.operation.currency !== currency) {
      console.log(`User ${e.user_id} used ${e.operation.currency} instead of EUR. Calculation canceled`);
    } else {
      const percents = cashOutJuridicalConfig.percents;
      const minAmount = cashOutJuridicalConfig.min.amount;

      //calculate fee
      let feeCalculated = Math.ceil(e.operation.amount * 100 * percents) / 100;
      feeCalculated = feeCalculated < minAmount ? 0.50 : feeCalculated;
      feeCalculated = Number.prototype.toFixed.call(feeCalculated, 2);
      console.log(feeCalculated);

    }
  }




  const calcCommission = function calculateCommissionFees(e) {
    if (e.type === 'cash_in') {
      cashIn(e);

    } else if (
      e.type === 'cash_out' && e.user_type === 'natural') {
        
        cashOutNatural(e);

    } else if (e.type === 'cash_out' && e.user_type === 'juridical') {
      cashOutLegal(e);

    }
  }



  // const debugMode = function initiateProgramInDebugMode() {
  //   if (isDebugArgument !== undefined) {
  //     console.log('--- Running program in debug mode ---')
  //   } else if (isDebugArgument === 'debug') {
  //     // console.log('Debug mode: OFF')
  //   }

  // }



  if (urlArgument === undefined) {
    console.log(' ')
    console.log('Function accepts following parameters:');
    console.log('processData(<URL>, debug')
    console.log('<URL>    - specify .json to initiate commision calculations');
    console.log('debug    - execute in debug mode')
    return;
  } else {
    checkJson();
    // debugMode();
    input.forEach(calcCommission);
    
  }
   


};
this.processData();
