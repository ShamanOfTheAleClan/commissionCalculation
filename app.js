module.exports.processData = function () {
  const fs = require('fs');

  const arg = process.argv[2];
  
    // Similar to fs.readFile(), when the path is a directory, the behavior of 
    // fs.readFileSync() is platform-specific.
  let input;
  if (arg === null || arg === undefined) {
    console.log(" ")
    console.log('Input one of the following:');
    console.log('   <string> | <URL>  - specify .json to initiate commision calculations');
    console.log('   "debug"           - experimental')
    return;
  } else {
    input = JSON.parse(fs.readFileSync(arg, {encoding: 'utf8'}));
  }
  const cashInConfig = fs.readFileSync('./config/cash_in.json',{encoding: 'utf8'});  

  // In case data in JSON is in Object instead of Array, let's make it Array.
  if (!Array.isArray(input)) {
    input = Array.from(input);
  }


  input.forEach((transaction) => {
    
    // define commission fee calculation function here
    function calculateCommission(){
      const percents = cashInConfig.percents;
      const maxAmount = cashInConfig.max.amount;
      let feeCalculated;

      if (type === 'cash_in') {
        fee = 0.03;

        feeCalculated = Math.ceil(operation.amount * 100 * percents) / 100;
        feeCalculated > maxAmount ? feeCalculated = 5 : feeCalculated;
      }
    }

    console.log(cashInConfig);
    //cash in
    //cash out
      // natural persons
      // Calculate, how much person has cashed out this week
      // if > 1000.00 EUR -> apply commission for overdraft
        // {
        //   "percents": 0.03,
        //   "max": {
        //       "amount": 5,
        //       "currency": "EUR"
        //   }
        // } 


      // legal persons
        // {
        //   "percents": 0.3,
        //   "min": {
        //       "amount": 0.5,
        //       "currency": "EUR"
        //   }
        // }

        // ceil result

  });



};
this.processData();
