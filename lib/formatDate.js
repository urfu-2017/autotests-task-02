module.exports = function formatDate(dateString) {
    const invalidDateError = "Invalid Date";

    if (new Date(dateString).toString() === invalidDateError) {
        throw new Error("Введенная дата имеет некорректный формат")
    }

    let date = new Date(Date.parse(dateString));
    let today = new Date();
    let formatDate = null;

    if (getYear(today) === getYear(date)) {
        if (getDay(today) === getDay(date)) {
            formatDate = `${printHours(date)}:${printMinutes(date)}`;
        } else {
            if (getDay(today) === getDay(date) + 1) {
                formatDate = `вчера ${printHours(date)}:${printMinutes(date)}`;
            } else {
                formatDate = `${getDay(date)} ${printMonth(date)} в ${printHours(date)}:${printMinutes(date)}`;
            }
        }
    } else {
        formatDate = `${getDay(date)} ${printMonth(date)} ${getYear(date)} года в ${printHours(date)}:${printMinutes(date)}`;
    }
    return formatDate;
};

function getYear(date) {
    return date.getUTCFullYear();
}

function getDay(date) {
    return date.getUTCDate();
}

function printMinutes(date) {
    let minutes = date.getUTCMinutes();

    return minutes >= 10 ? minutes: `0${minutes}`;
}

function printHours(date) {
    let hours = date.getUTCHours();

    return hours >= 10 ? hours: `0${hours}`;
}

function printMonth(date) {
    let monthNumber = date.getUTCMonth();
    let monthes = [
        "января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ];
    return monthes[monthNumber];
}
