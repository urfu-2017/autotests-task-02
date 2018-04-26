const moment = require('moment');

module.exports = function formatDate(date) {
    if (typeof date !== 'string' &&
        !Number.isFinite(date) &&
        !(date instanceof Date)) {
        throw new Error('Invalid date');
    }
    const dateFormat = moment(date).locale('ru').utc();
    const now = moment().locale('ru').utc();
    if (dateFormat.year() !== now.year()) {
        return dateFormat.format('D MMMM YYYY года в HH:mm');
    }
    if (dateFormat.month() === now.month()) {
        if (dateFormat.date() - now.date() === -1) {
            return dateFormat.format('вчера в HH:mm');            
        }
        if (dateFormat.date() - now.date() === 0) {
            return dateFormat.format('HH:mm');            
        }
    }

    return dateFormat.format('D MMMM в HH:mm');
}
