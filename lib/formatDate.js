const month = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября',
    'октрября', 'ноября', 'декабря'
];

exports.formatDate = dateInAnyFormat => {
    const date = new Date(dateInAnyFormat);
    if (isNaN(date)) {
        throw new Error(`${dateInAnyFormat} не является датой`);
    }
    if (isToday(date)) {
        return `${getTime(date)}`;
    }
    if (isYesterday(date)) {
        return `вчера в ${getTime(date)}`;
    }
    if (isCurrentYear(date)) {
        return `${getDateWithMonth(date)} в ${getTime(date)}`;
    }

    return `${getDateWithMonth(date)} ${date.getFullYear()} года в ${getTime(date)}`;
};

function isToday(date) {
    const currentDate = new Date();

    return currentDate.getFullYear() === date.getFullYear() &&
        currentDate.getMonth() === date.getMonth() &&
        currentDate.getDate() === date.getDate();
}

function isYesterday(date) {
    const currentDate = new Date();

    return currentDate.getFullYear() === date.getFullYear() &&
        currentDate.getMonth() === date.getMonth() &&
        currentDate.getDate() === date.getDate() + 1;
}

function isCurrentYear(date) {
    const currentDate = new Date();

    return currentDate.getFullYear() === date.getFullYear();
}

function getTime(date) {
    return `${fillLeft(date.getHours(), 2, '0')}:${fillLeft(date.getMinutes(), 2, '0')}`;
}

function getDateWithMonth(date) {
    return `${fillLeft(date.getDate(), 2, '0')} ${month[date.getMonth()]}`;
}

function fillLeft(strInAnyFormat, count, symbol) {
    const str = strInAnyFormat.toString();
    const countNeed = count - str.length;
    if (countNeed >= 1) {
        const filledStr = new Array(countNeed + 1).join(symbol);

        return `${filledStr}${str}`;
    }

    return str;
}

exports.fillLeft = fillLeft;
exports.month = month;
