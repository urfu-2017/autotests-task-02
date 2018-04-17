var moment = require('moment');
moment.locale('ru');

module.exports = function formatDate(date) {
    var dateMoment = moment(date).utcOffset(0);
	if (!dateMoment.isValid())
		return '';
	if (isToday(dateMoment))
		return dateMoment.format('HH:mm');
	if (isYesterday(dateMoment))
		return `вчера в ${dateMoment.format('HH:mm')}`;
	if (isThisYear(dateMoment))
		return `${dateMoment.format('DD MMMM')} в ${dateMoment.format('HH:mm')}`;
	
	return `${dateMoment.format('DD MMMM YYYY года')} в ${dateMoment.format('HH:mm')}`;
};

function isToday(dateMoment) {
	var startOfDay = moment(dateMoment).startOf('day');
	return moment().utcOffset(0).add(moment().utcOffset(), 'minutes').startOf('day').diff(startOfDay, 'days') === 0;
}

function isYesterday(dateMoment) {
	var startOfDay = moment(dateMoment).startOf('day');
	return moment().utcOffset(0).add(moment().utcOffset(), 'minutes').startOf('day').diff(startOfDay, 'days') === 1;
}

function isThisYear(dateMoment) {
	var startOfDay = moment(dateMoment).startOf('day');
	return moment().utcOffset(0).add(moment().utcOffset(), 'minutes').startOf('day').diff(startOfDay, 'years') === 0;
}
