const moment = require('moment')
moment.locale('ru');
module.exports = function formatDate(date) {
    // Напишите код форматирования даты в этом месте

    let today = new Date();
    let formatDate = new Date(date);

    if(isNaN(formatDate.getDate()) || date === null) {
        throw new Error('invalid date')
    }

    if(formatDate>today) {
        throw new Error('future date')
    }

    if (formatDate.getFullYear() !== today.getFullYear())
        return rightTime(formatDate,'DD MMMM YYYY года в HH:mm');

    if (formatDate.getMonth() !== today.getMonth())
        return rightTime(formatDate,'DD MMMM в HH:mm');

    if (formatDate.getDate()+1 === today.getDate()) {
        return rightTime(formatDate,'вчера в HH:mm');
    }

    if (formatDate.getDate() == today.getDate()) {
        return rightTime(formatDate,'HH:mm');
    }

    return rightTime(formatDate,'DD MMMM в HH:mm');
};

function rightTime(time, format) {

    return moment(time).utc().format(format);
}