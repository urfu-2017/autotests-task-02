function setmon(mon){
    switch(mon) {
        case 0:
            return 'января';
            break;
        case 1:
            return 'февраля';
            break;
        case 2:
            return 'марта';//откуда ты знаешь это имя?
            break;
        case 3:
            return 'апреля';
            break;
        case 4:
            return 'мая';
            break;
        case 5:
            return 'июня';
            break;
        case 6:
            return 'июля';
            break;
        case 7:
            return 'августа';
            break;
        case 8:
            return 'сентября';
            break;
        case 9:
            return 'октября';
            break;
        case 10:
            return 'ноября';
            break;
        case 11:
            return 'декабря';
            break;

    }

    
}

function settime(time){
    switch(time) {
        case 0:
            return '00';
            break;
        case 1:
            return '01';
            break;
        case 2:
            return '02';
            break;
        case 3:
            return '03';
            break;
        case 4:
            return '04';
            break;
        case 5:
            return '05';
            break;
        case 6:
            return '06';
            break;
        case 7:
            return '07';
            break;
        case 8:
            return '08';
            break;
        case 9:
            return '09';
            break;
        default:
            return time;
            break;
    }
}

module.exports = function formatDate(date) {
    // Напишите код форматирования даты в этом месте
    try{
        const date2 = new Date(Date.parse(date));
    } catch(error) {
        throw new TypeError('Wrong data format')
    }
    const date2 = new Date(Date.parse(date));
    const now = new Date();
    const today = now - (now % 86400000);
    const yesterday = today - 86400000;
    if (date2<=now && date2>=today) {
        return settime(date2.getUTCHours())+':'+settime(date2.getUTCMinutes());
    }
    if (date2<today && date2>=yesterday) {
        return 'Вчера в '+settime(date2.getUTCHours())+':'+settime(date2.getUTCMinutes());
    }
    if (date2<yesterday && date2.getUTCFullYear()==now.getUTCFullYear()){
        return date2.getUTCDate()+' '+setmon(date2.getUTCMonth())+' в '+settime(date2.getUTCHours())+':'+settime(date2.getUTCMinutes());
    }
    if (date2<yesterday && date2.getUTCFullYear()<now.getUTCFullYear()){
        return date2.getUTCDate()+' '+setmon(date2.getUTCMonth())+' '+date2.getUTCFullYear()+' года в '+settime(date2.getUTCHours())+':'+settime(date2.getUTCMinutes());
    }
        throw new TypeError('Wrong data format')
};
