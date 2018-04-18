const moment = require('moment');

module.exports = function formatDate(date) {
    if (!(date instanceof Date && !isNaN(date.valueOf()))) {
        throw Error("Date is not valid");
    }

    date = moment(date).locale('ru').utc();

    if (moment().utc().startOf('day') <= date) {
        return date.format('HH:mm');
    }

    if (moment().utc().subtract(1, 'days').startOf('day') <= date) {
        return date.format('вчера в HH:mm');
    }

    if (moment().utc().startOf('year') <= date) {
        return date.format('DD MMMM в HH:mm');
    }

    return date.format('DD MMMM YYYY года в HH:mm');
};
