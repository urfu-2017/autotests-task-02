'use strict';
module.exports= function formatDate(date) {

    if (!Date.parse(date))
    {
        throw new Error("Invalid date");
    }

    var MONTHLIST=[
        "января",
        "феврвля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря"
    ];

    // Напишите код форматирования даты в этом месте
    var now=new Date();

    var time=new Date(date);


    var numDay = time.getUTCDate();
    var hour = time.getUTCHours();
    var minute = time.getUTCMinutes();
    var year=time.getFullYear();
    var month=time.getUTCMonth();


    if (minute < 10) minute = "0" + minute;
    if (hour < 10) hour = "0" + hour;

     var diff=now-time;
     var days=Math.floor(diff / (1000 * 60 * 60 * 24));
console.log(days);
     if(now.getFullYear()==time.getFullYear() && now.getMonth()==time.getMonth())
     {
         if(days==0)
         {
             return(hour+":"+minute);
         }
         if(days==1)
         {
             return( "вчера в "+ hour+":"+minute);
         }else {
             return( numDay+ " " + MONTHLIST[month]+ " в "+ hour+":"+minute);
         }
     }else {
         return(numDay+ " " + MONTHLIST[month]+ " " + year + " года " + "в "+ hour+":"+minute);
     }

};
/*var date=new Date();
console.log(formatDate(date));
date.setUTCDate(date.getUTCDate() - 1);
console.log(date);
console.log(formatDate(date));*/

