const moment = require('moment');
moment.suppressDeprecationWarnings = true;

module.exports = function formatDate (date) {
    const today = moment();
    tweetDay = moment(date).locale('ru');
    if (!Date.parse(tweetDay)) throw new Error('Not valid date');
    if (today.diff(tweetDay, 'days') == 0) return tweetDay.format('HH:mm');
    if (today.diff(tweetDay, 'days') == 1) return 'вчера в ' + tweetDay.format('HH:mm');
    if ( today.diff(tweetDay, 'days') > 1 && tweetDay.format('YY') === today.format('YY')) 
        return tweetDay.format('DD MMMM [в] HH:mm')
    else
      return tweetDay.format('DD MMMM YYYY [года в] HH:mm');
}
