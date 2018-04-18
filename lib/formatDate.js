const moment = require('moment');

moment.locale('ru');

module.exports = function formatDate(date) {
    const nowTimestamp = moment.utc(new Date());
    
    const dateTimestamp = moment.utc(date);
    if (!dateTimestamp.isValid())
        throw new TypeError('Argument `date` is invalid');
    
    if (nowTimestamp.isBefore(dateTimestamp))
        throw new TypeError('`date` can not be from the future');

    if (dateTimestamp.isSame(nowTimestamp, 'day'))
        return dateTimestamp.format('HH:mm');
    
    if (nowTimestamp.subtract(1, 'day').isSame(dateTimestamp, 'day'))
        return dateTimestamp.format('вчера в HH:mm');

    if (dateTimestamp.isSame(nowTimestamp, 'year'))
        return dateTimestamp.format('D MMMM в HH:mm');
    
    if (dateTimestamp.isBefore(nowTimestamp, 'year'))
        return dateTimestamp.format('D MMMM YYYY года в HH:mm');
};
