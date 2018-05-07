const time = require('luxon');
const moment = require('moment');
moment.locale('ru');
module.exports = function formatDate(date, currentDate = time.DateTime.local().toISO()) {
    const { DateTime } = time;
    const dateObj = DateTime.fromISO(date, { setZone: true });
    const currentDateObj = DateTime.fromISO(currentDate, { setZone: true });
    const interval = time.Interval.fromDateTimes(
        dateObj.set({ hour: 0, minute: 0 }),
        currentDateObj.set({ hour: 0, minute: 0 })
    );

    if (!DateTime.fromISO(date).isValid) {
        throw new TypeError('Invalid date time');
    }

    if(interval.length('days') === 0) {
        return dateObj.toFormat('hh:mm');
    }

    if(interval.length('days') === 1) {
        return 'вчера в ' + dateObj.toFormat('hh:mm');
    }

    if(currentDateObj.hasSame(dateObj, 'year')) {
        return moment(date).format('D MMMM') + ' в ' + dateObj.toFormat('HH:mm');
    }

    return moment(date).format('D MMMM Y') + ' года в ' + dateObj.toFormat('HH:mm');
};
