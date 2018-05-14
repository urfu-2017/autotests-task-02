module.exports = function formatDate(date) {
    // Напишите код форматирования даты в этом месте
    date = new Date(date);
    if (isNaN(date)) {
        return 'incorrect data';
    }

    date = dateParse(date);
    let now = dateParse(new Date());

    if (date.yyyy === now.yyyy &&
        date.mm === now.mm &&
        date.dd === now.dd) {
            return date.hhmm;
    } else if (date.yyyy === now.yyyy &&
        date.mm === now.mm &&
        date.dd + 1 === now.dd) {
            return `вчера в ${date.hhmm}`;
    } else if (date.yyyy !== now.yyyy) {
        return `${date.dd} ${date.longMM} ${date.yyyy} года в ${date.hhmm}`;
    } else {
        return `${date.dd} ${date.longMM} в ${date.hhmm}`;
    }
};

function dateParse(date) {
    let longMonth = {
        0: 'января',
        1: 'февраля',
        2: 'марта',
        3: 'апреля',
        4: 'мая',
        5: 'июня',
        6: 'июля',
        7: 'августа',
        8: 'сентября',
        9: 'октября',
        10: 'ноября',
        11: 'декабря'
    };

    return {
        yyyy: date.getFullYear(),
        mm: date.getMonth(),
        longMM: longMonth[date.getMonth()],
        dd: date.getDate(),
        hhmm: date.toISOString().split('T')[1].match(/\d\d:\d\d/g)[0]
    };
}
