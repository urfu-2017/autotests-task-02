const moment = require('moment');

module.exports = function formatDate(date)
{
    if (!(moment(date).isValid()))
    {
        throw Error("Date is not valid");
    }
    date = moment(date).locale('ru').utc();
    if (moment.utc(new Date()).isBefore(date))
    {
        throw new TypeError('Tweet from future'); // Дата из будущего
    }
    if (moment().utc().startOf('day') <= date)
    {
        return date.format('HH:mm');
    }
    if (moment().utc().subtract(1, 'days').startOf('day') <= date)
    {
        return date.format('вчера в HH:mm');
    }
    if (moment().utc().startOf('year') <= date)
    {
        return date.format('D MMMM в HH:mm');
    }
    return date.format('D MMMM YYYY года в HH:mm');
};