const time = require('luxon');
const moment = require('moment');
moment.locale('ru');
module.exports = function formatDate(date) {
    const timeItem = time.DateTime;

    if (!timeItem.fromISO(date).isValid) {
        throw new TypeError('Invalid date time');
    }

    dateObj = timeItem.fromISO(date, { setZone: true });
    const timeItemDay = time.DateTime.local().day;
    const interval = time.Interval
        .fromDateTimes(dateObj, time.DateTime.fromISO(time.DateTime.local(), { setZone: true }));
    if(interval.length('days') <= 1) {
        return 'вчера в ' + dateObj.toFormat('HH:mm');
    }

    if(timeItem.local().hasSame(dateObj, 'year')) {

        if(timeItemDay - dateObj.day > 1 || time.DateTime.local().month - dateObj.month >= 1) {
            return moment(date).format('D MMMM') + ' в ' + dateObj.toFormat('HH:mm');
        }

        return dateObj.toFormat('HH:mm');
    }

    return moment(date).format('D MMMM Y') + ' года в ' + dateObj.toFormat('HH:mm');
};
