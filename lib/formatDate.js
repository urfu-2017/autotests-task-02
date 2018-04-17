const moment = require('moment');

module.exports = function formatDate(date) {
var now = moment(new Date);

var newDate = moment(new Date(date)).locale('ru');

//исключение на невалидную дату
if ((!newDate.isValid())) {
    throw new TypeError('Invalid date');    
}    
//исключение на будущую дату
if (newDate.fromNow().split(' ')[0] == 'через') {
    throw new TypeError('Future date');
}

    if(moment().startOf('day') <= newDate)
        return newDate.format('HH:mm');
    if(moment().subtract(1, 'days').startOf('day') <= newDate)   
        return  newDate.format('вчера в HH:mm');
    if(moment().startOf('year') <= newDate)    
        return newDate.format('DD MMMM в HH:mm');
    if(moment().startOf('year') > newDate)
        return newDate.format('DD MMMM YYYY года в HH:mm');
};
