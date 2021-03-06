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
let weeksArray = [];
for (let i = 0; i < 54; i++) {
    weeksArray.push(new Week(i + 1));
}

const getWeek = function getWeekNumber(inputDate) {
    const date = new Date(new Date(inputDate).getFullYear(), 0, 1);
	const weekDay = (date.getDay());
    return Math.ceil((((new Date(inputDate) - date) / 86400000) + date.getDay()-6 + weekDay) / 7);
};

exports.User = User;
exports.Week = Week;
exports.weeksArray = weeksArray;
exports.getWeek = getWeek;