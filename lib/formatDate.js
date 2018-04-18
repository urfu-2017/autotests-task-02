'use strict';
module.exports = function formatDate(date) {
    // Напишите код форматирования даты в этом месте
    if(arguments.length !==  1 ){
        throw new Error('More than one argument');
    }
    if(!date.getTime){
        throw new Error('Invalid argument');
    }

    var now = new Date();
    var month = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября','Октября', 'Ноября', 'Декабря'];

    var hh = date.getUTCHours();
    var mm = date.getUTCMinutes();
    if (hh<10)
        hh = '0' + hh;
    if (mm<10)
        mm = '0'+mm;

    if (date.getUTCFullYear() === now.getUTCFullYear())
    {
        if (date.getUTCMonth() === now.getUTCMonth())
        {
            if (date.getUTCDate() === now.getUTCDate())
                return `${hh}:${mm}`;
            if (date.getUTCDate() + 1 === now.getUTCDate())
                return `вчера в ${hh}:${mm}`;
            else return `${date.getUTCDate()} ${month[date.getUTCMonth()]} в ${hh}:${mm}`;
        }
        else return `${date.getUTCDate()} ${month[date.getUTCMonth()]} в ${hh}:${mm}`;

    }
    else return `${date.getUTCDate()} ${month[date.getUTCMonth()]} ${date.getUTCFullYear()} года в ${hh}:${mm}`

};
