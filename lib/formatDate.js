const moment = require('moment')
moment.locale('ru')
module.exports = function formatDate(date) {
    // Напишите код форматирования даты в этом месте
    var today = new Date();
    var formatDate = new Date(date);
    if(formatDate.getFullYear() !== today.getFullYear())
        return moment(formatDate).format('MMMM Do YYYY, h:mm:ss a');

    return formatDate;
};

