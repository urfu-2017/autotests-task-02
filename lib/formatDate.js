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
        switch (dateFormat.date() - now.date()) {
            case -1:
                return dateFormat.format('вчера в HH:mm');
            case 0:
                return dateFormat.format('HH:mm')
            default:
                break;
        }
    }

    return dateFormat.format('D MMMM в HH:mm');
}
