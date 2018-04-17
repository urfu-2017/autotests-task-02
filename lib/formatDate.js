const getTime = require('./getTime');

const MONTH = [
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

const formatDate = (date, nowDate = new Date()) => {
    const time = getTime(date);
    const day = date.getUTCDate();
    const month = MONTH[date.getUTCMonth()];
    const year = date.getFullYear();
    
    if (nowDate.getFullYear() !== year) {
        return `${day} ${month} ${year} года в ${time}`;
    }
    
    if (nowDate.getUTCDate() - day > 1) {
        return `${day} ${month} в ${time}`;
    }
    
    if (nowDate.getUTCDate() - day === 1) {
        return `вчера в ${time}`;
    }
    
    return time;
};

module.exports = formatDate;