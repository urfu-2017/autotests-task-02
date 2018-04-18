'use strict';

module.exports = function formatDate(date) {
    // Напишите код форматирования даты в этом месте

const moment = require('moment');

module.exports = date =>{
	if(!(Number.isFinite(date) || date instanceof String || date instanceof Date))
	{
		return 'Inactive date';
	}

	date = moment(date).locale('ru');

	if(moment().startOf('day') <= date)
	{
		return date.format('HH:mm');
	}

	if(moment().substract(1, 'days').startOf('day') <= date)
	{
		return date.format('Вчера в HH:mm');
	}

	if(moment().startOf('year') <= date)
	{
		return date.format('DD MMMM в HH:mm');
	}
};