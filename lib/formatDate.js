module.exports = function formatDate(date) {
    if (!date) {
        throw new TypeError('Date is undefined or is empty');
    }
    if ((typeof date) != typeof '') {
        throw new TypeError('Date is not string');
    }
    date = date.split('.')[0];

    if (date.length < 17 || !Date.parse(date)) {
        throw new TypeError('Incorrect date format');
    }
    var publicationDate = new Date(date);

    var now = new Date();

    var mm = publicationDate.getMinutes();
    if (mm < 10) mm = '0' + mm;

    var hh = publicationDate.getHours();
    if (hh < 10) hh = '0' + hh;

    var result = hh + ':' + mm;

    var month = [' января ', ' февраля ', ' марта ', ' апреля ', ' мая ', ' июня ', ' июля ', ' августа ', ' сентября ', ' октября ', ' ноября ', ' декабря '];

    if ((now.getFullYear() - publicationDate.getFullYear()) > 0) {
        result = publicationDate.getUTCDate() + month[publicationDate.getUTCMonth()] + publicationDate.getFullYear() + ' года в ' + result;
    }
    else if ((now.getMonth() - publicationDate.getMonth() > 0) || (now.getDate() - publicationDate.getDate()) > 1) {
        result = publicationDate.getDate() + month[publicationDate.getMonth()] + 'в ' + result;
    }
    else if (now.getDay() - publicationDate.getDay() === 1) {
        result = 'вчера в ' + result;
    }
    else if (now - publicationDate < 0) {
        throw new TypeError('future time received')
    }

    return result;
};
