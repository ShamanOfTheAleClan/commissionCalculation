const overdraftCheck = require('./overdraftCheck');
const weeks = require('./weeks');
const User = weeks.User;
// const configs = require('./configurations');

const calculate = function calculateCashOutFeeForNaturalPerson(inputOperation) {

    const week = weeks.getWeek(inputOperation.date);
    const amount = inputOperation.operation.amount;
    const userId = inputOperation.user_id;
    // console.log(weeks.weeksArray);
    // console.log(week);
    // console.log(weeks.weeksArray[week - 1]);
    // console.log(weeks.weeksArray[week - 1].users);
    const userExists = !!weeks.weeksArray[week - 1].users.filter(user => (user.id === userId)).length;

    // if has already cashed out this week
    if (userExists) {
        // - find that user and return object
        const thisUser = Array.prototype.find.call(weeks.weeksArray[week + 1].users, user => {
            return user.id === userId;
        });

        const feeCalculated = overdraftCheck.check(thisUser, amount);
        thisUser.amount += amount;
        return feeCalculated;


    } else {
        // add new user with given id to this week
        weeks.weeksArray[week - 1].users.push(new User(userId, 0));
    // console.log( weeks.weeksArray[week - 1].users);
        const thisUser = Array.prototype.find.call(weeks.weeksArray[week - 1].users, user => {
            return user.id === userId;
        });

        const feeCalculated = overdraftCheck.check(thisUser, amount);
        console.log('thisUser: ', thisUser);
        thisUser.amount += amount;
        return feeCalculated;
    }
}
exports.calculate = calculate;