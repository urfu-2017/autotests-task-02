const moment = require('moment');
moment.suppressDeprecationWarnings = true;

module.exports = function formatDate (secondDay) {
    const today = moment();
    day2 = moment(secondDay).locale('ru');
    if (!Date.parse(day2)) throw new Error('Not valid date');
    if (today.diff(day2, 'days') == 0) return day2.format('HH:mm');
    if (today.diff(day2, 'days') == 1) return 'вчера в ' + day2.format('HH:mm');
    if ( today.diff(day2, 'days') > 1 && day2.format('YY') === today.format('YY')) 
        return day2.format('DD MMMM [в] HH:mm')
    else
      return day2.format('DD MMMM YYYY [года в] HH:mm');
}
