module.exports = function formatDate(date) {
    //Напишите код форматирования даты в этом месте
    if(date == null)
        throw new TypeError('Error empty value')
    date = date.toString();
    if (date.indexOf("T")==-1 || date.lastIndexOf("-")==-1)
        throw new TypeError('Erroe with type of date '+ date.indexOf("T") +  date.lastIndexOf("-"));

    var time = date.lastIndexOf("-");
    var dateReturn = "";
    var day = Number(date[time+1] + date[time+2]);
    var year = "";
    var month = Number(date[time - 2] + date[time - 1]);
    var monthToString = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
    var dates = new Date();

    for(var i = 0; i < 4; i++){
        year += date[i];
    }

    if (day > 31 || day < 0 || month > 11 || month < 0 || Number(year) < 0) //Проверка на количество дней и месяцев
        throw new TypeError('Error with date, day = ' + day + ' month = ' + month + ' year = ' + year);   
    else if (dates.getFullYear() - Number(year)<0)//Проверка года
        throw new TypeError('Twit from the future Year = ' + year);   
    else if( dates.getFullYear() - Number(year) == 0 && dates.getMonth() - month < 0)//Проверка месяца
        throw new TypeError('Twit from the future Month = ' + month); 
    else if(dates.getFullYear() - Number(year) == 0 && dates.getDate() - day+1 < 0 && dates.getMonth() - month == 0)//Проверка дня 
        throw new TypeError('Twit from the future Day = ' + day); 

    if(dates.getDate() - day == 1 && dates.getMonth() - month == 0)
        dateReturn = "вчера в ";
    else if((dates.getMonth() - month > 0 || dates.getDate() - day > 1) && dates.getFullYear() - Number(year)==0 )
    {
        dateReturn = day.toString()+ " " + monthToString[month-1]+" в ";
    }
    else if((dates.getMonth() - month > 0 || dates.getDate() - day > 1) && dates.getFullYear() - Number(year)>0)
    {
        dateReturn = day.toString()+ " " + monthToString[month-1]+ " "+ year + " года в ";
    }

    time = date.indexOf("T")+1;

    for (var i=0; i<5; i++){
        dateReturn += date[time+i];
    }
    return dateReturn;
};