const moment = require('moment');

module.exports = function formatDate(date) {
    if (!Date.parse(date)) throw new Error('Не корректная дата!');

    const currentDate = moment().utc();
    date = moment(date).locale('ru').utc();
    if (currentDate - date < 0 ) throw new Error('Дата будущего!');

    if (currentDate.clone().startOf('day') <= date) return date.format('H:mm');
    if (currentDate.clone().startOf('day').subtract(1, 'day') <= date) return date.format('[вчера в] H:mm');
    if (currentDate.clone().startOf('year') <= date) return date.format('DD MMMM [в] H:mm');

    return date.format('DD MMMM YYYY [года в] H:mm');
};
