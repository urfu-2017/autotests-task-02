const time = require('luxon');
const moment = require('moment');
moment.locale('ru');
module.exports = function formatDate(date) {
    let timeItem = time.DateTime;

    if (arguments.length !== 1) {
        throw new Error('There must be only one argument');
    }

    if (!timeItem.fromISO(date).isValid) {
        throw new TypeError('Invalid date time');
    }

    dateObj = timeItem.fromISO(date, { setZone: true });
    let timeItemDay = time.DateTime.local().day;
    if(timeItem.local().hasSame(dateObj, 'year')) {

        if(timeItemDay - dateObj.day > 1 || time.DateTime.local().month - dateObj.month >= 1)

            return moment(date).format('D MMMM') + ' в ' + dateObj.toFormat('HH:mm');

        if(timeItemDay - dateObj.day === 1)

            return 'вчера в ' + dateObj.toFormat('HH:mm');

        else if(timeItem.local().hasSame(dateObj, 'day'))

            return dateObj.toFormat('HH:mm');

    } else
        return moment(date).format('D MMMM Y') + ' года в ' + dateObj.toFormat('HH:mm');
};
