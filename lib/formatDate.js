const getToday = require('../lib/getToday');

module.exports = function formatDate(date) {
    if (date === undefined) {
        throw new Error('Функцию formatDate нельзя вызвать без аргументов.');
    }
    if (typeof (date) !== 'string') {
        throw new Error('Передайте на вход дату строкой в формате yyyy-mm-ddThh:mm:ss.sssZ.');
    }

    var dateFormat = /(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2}).(\d{3})Z/;
    if (!dateFormat.test(date)){
        throw new Error('Дата должна быть в формате yyyy-mm-ddThh:mm:ss.sssZ');
    }

    var date = new Date(date);
    if (date < new Date('2006-03-21')){
        throw new Error('Слишком ранняя дата. Дата должна быть позже 21.03.16.');
    }
    var today = getToday();
    var monthName = getMonthName(date.getUTCMonth());

    if (monthName === undefined){
        throw new Error('Некорректная дата.');
    }

    var time=getFormatTime(date);

    if (Date.parse(date.toUTCString()) > Date.parse(today.toUTCString())){
        throw new Error('Дата должна быть меньше текущей.');
    }

    if (today.toUTCString().slice(0, -13) === date.toUTCString().slice(0, -13)) {
        return time;
    }

    var yesterday = new Date();
    yesterday.setDate(yesterday.getUTCDate() - 1);
    if (yesterday.toUTCString().slice(0, -13) === date.toUTCString().slice(0, -13)) {
        return "вчера в " + time;
    }

    if (date.getUTCFullYear() === today.getUTCFullYear()){
        return date.getUTCDate() + ' ' + monthName + ' в ' + time;
    }
    else {
        return date.getUTCDate() + ' ' + monthName + ' ' + date.getUTCFullYear() + ' года' + ' в ' + time;
    }
};

function getFormatTime(date) {
    var time = [
        '0' + date.getUTCHours(),
        '0' + date.getMinutes()
    ];
    for (var i in time) {
        time[i] = time[i].slice(-2);
    }
    return time[0] + ":" + time[1];
}

function getMonthName(index) {
    var months = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря'
    ];
    return months[index];
}