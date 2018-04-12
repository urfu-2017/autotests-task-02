'use strict';

const moment = require('moment');

module.exports = date => {
    if (!(date instanceof Date) && !Number.isFinite(date)) {
        return 'Invalid date';
    }

    date = moment(date).locale('ru');

    if (moment().startOf('day') <= date) {
        return date.format('HH:mm');
    }

    if (moment().subtract(1, 'days').startOf('day') <= date) {
        return date.format('Вчера в HH:mm');
    }

    if (moment().startOf('year') <= date) {
        return date.format('DD MMMM в HH:mm');
    }

    return date.format('DD MMMM YYYY года в HH:mm');
};
