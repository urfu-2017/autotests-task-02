const moment = require('moment');
moment.locale('ru');

module.exports = function formatDate(date) {
    const nowIsThisTime = moment.utc(new Date());
    
    const insertedDate = moment.utc(date);
    if (!insertedDate.isValid())
        throw new TypeError('`date` is not valid argument'); // Валидность
    
    if (nowIsThisTime.isBefore(insertedDate))
        throw new TypeError('`date` can be only from the past or today'); // Дата из будущего
    // Обработка данных
    if (insertedDate.isSame(nowIsThisTime, 'day'))
        return insertedDate.format('HH:mm');
    
    if (nowIsThisTime.subtract(1, 'day').isSame(insertedDate, 'day'))
        return insertedDate.format('вчера в HH:mm');

    if (insertedDate.isSame(nowIsThisTime, 'year'))
        return insertedDate.format('D MMMM в HH:mm');
    
    if (insertedDate.isBefore(nowIsThisTime, 'year'))
        return insertedDate.format('D MMMM YYYY года в HH:mm');
};