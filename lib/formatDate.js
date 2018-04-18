module.exports = function formatDate(date) {
    // Напишите код форматирования даты в этом месте
    date = date.toString();

    var time;
    var dateReturn = "";
    var day;
    var year = "";
    var month = "";
    var monthToString = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
    var dates = new Date();


    time = date.lastIndexOf("-")+1;
    day = Number(date[time] + date[time+1]);
    for(var i = 0; i < 4; i++){
        year += date[i];
    }
    time = date.lastIndexOf("-");
    month = Number(date[time - 2] + date[time - 1]);
    if (time==0)
        throw new TypeError('Erroe with type of date');

    if (day > 31 || day < 0 || month > 11 || month < 0 || Number(year) < 0) //Проверка на количество дней и месяцев
    throw new TypeError('Error with date, day = ' + day + ' month = ' + month + ' year = ' + year);   

    if (dates.getFullYear() - Number(year)<0)//Проверка года
        throw new TypeError('Twit from the future Year = ' + year);   

    if( dates.getDate() - day < 0 && dates.getMonth()+1 - month == 0)//Проверка дня
        throw new TypeError('Twit from the future Day = ' + day); 

    if( dates.getFullYear() - Number(year) == 0 && dates.getMonth()+1 - month < 0)//Проверка месяца
        throw new TypeError('Twit from the future Month = ' + month); 

    if(dates.getDate() - day == 1 )
        dateReturn = "вчера в ";
    else if((dates.getMonth()+1 - month > 0 || dates.getDate() - day > 1) && dates.getFullYear() - Number(year)==0 )
    {
        dateReturn = day.toString()+ " " + monthToString[month-1]+" в ";
    }
    else if((dates.getMonth()+1 - month > 0 || dates.getDate() - day > 1) && dates.getFullYear() - Number(year)>0)
    {
        dateReturn = day.toString()+ " " + monthToString[month-1]+ " "+ year + " года в ";
    }
    time = date.indexOf("T")+1
    if (time==0)
    throw new TypeError('Erroe with type of date');

    for (var i=0; i<5; i++){
        dateReturn += date[time+i];
    }
    return dateReturn;
};
