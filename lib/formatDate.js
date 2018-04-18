module.exports = function formatDate(date) {
    var inputDate = new Date(date);
    var now = new Date();

    if (inputDate > now) {
        throw Error("Wrong date");
    }

    if (IsFullDatesEquals(now, inputDate)) {
        return GetTime(inputDate);
    }
    var yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    if (IsFullDatesEquals(yesterday, inputDate)) {
        return `вчера в ${GetTime(inputDate)}`;
    }
    if (IsYearsEquals(now, inputDate)) {
        return `${GetDate(inputDate)} в ${GetTime(inputDate)}`;
    }
    return `${GetDate(inputDate)} ${inputDate.getUTCFullYear()} года в ${GetTime(inputDate)}`;
};

var month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля',
    'августа', 'сентября', 'октября', 'ноября', 'декабря']

function GetDate(date) {
    return `${date.getUTCDate()} ${month[date.getUTCMonth()]}`;
}

function IsYearsEquals(first, second){
    return first.getUTCFullYear() === second.getUTCFullYear();
}

function IsMonthAndDateEquals(first, second) {
    return first.getUTCMonth() === second.getUTCMonth()
        && first.getUTCDate() === second.getUTCDate();
}

function GetTime(date) {
    var minutes = date.getUTCMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${date.getUTCHours()}:${minutes}`;
}

function IsFullDatesEquals(first, second) {
    return IsYearsEquals(first, second) && IsMonthAndDateEquals(first, second);
}

// function formatDate(date) {
//     var inputDate = new Date(date);
//     var now = new Date();

//     if (inputDate > now) {
//         throw Error("Wrong date");
//     }

//     if (IsFullDatesEquals(now, inputDate)) {
//         return GetTime(inputDate);
//     }
//     var yesterday = new Date();
//     yesterday.setDate(now.getDate() - 1);
//     if (IsFullDatesEquals(yesterday, inputDate)) {
//         return `вчера в ${GetTime(inputDate)}`;
//     }
//     if (IsYearsEquals(now, inputDate)) {
//         return `${GetDate(inputDate)} в ${GetTime(inputDate)}`;
//     }
//     return `${GetDate(inputDate)} ${inputDate.getUTCFullYear()} года в ${GetTime(inputDate)}`;
// }

//console.log(formatDate("2018-04-17T07:05:10.609Z"))
