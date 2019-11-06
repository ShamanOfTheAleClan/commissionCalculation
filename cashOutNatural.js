const apiCall = require('./apiCall');
const overdraftCheck = require('./overdraftCheck');
const weeks = require('./weeks');
const User = weeks.User;

const calculate = function calculateCashOutFeeForNaturalPerson(inputOperation) {

    const limit = apiCall.cashOutNaturalConfig.week_limit.amount;
    const week = weeks.getWeek(new Date(inputOperation.date));
    const amount = inputOperation.operation.amount;
    const userId = inputOperation.user_id;
    const userExists = !!weeks.weeksArray[week + 1].users.filter(user => (user.id === userId)).length;

    // toDebugLog(`Week: ${week}`);
    // toDebugLog(`Limit: ${limit}`);
    // toDebugLog(`First operation this week: ${!userExists}`);
    // if has already cashed out this week
    if (userExists) {
        // - find that user 
        const thisUser = Array.prototype.find.call(weeks.weeksArray[week + 1].users, user => {
            return user.id === userId;
        });

        const feeCalculated = overdraftCheck.check(thisUser, amount);
        thisUser.amount += amount;
        console.log(feeCalculated);

        // toDebugLog(`Calculated fee: ${feeCalculated}`);

    } else {
        // add new user with given id to this week
        weeks.weeksArray[week + 1].users.push(new User(userId, 0));

        const thisUser = Array.prototype.find.call(weeks.weeksArray[week + 1].users, user => {
            return user.id === userId;
        });

        const feeCalculated = overdraftCheck.check(thisUser, amount);
        thisUser.amount += amount;
        console.log(feeCalculated);

        // toDebugLog(`Calculated fee: ${feeCalculated}`);
    }
}
exports.calculate = calculate;