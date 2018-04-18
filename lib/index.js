'use strict';
const getTweets = require('./getTweets');
const formatDate = require('./formatDate');
const print = require('./print');

module.exports = function showTweets() {
    // Получаем список твитов
    const tweets = getTweets('#urfu-testing-2017');

    // Производим манипуляции с датой
    // ...
    var str='';
    for (var i = 0; i < tweets.length; i++)
    {
        var date = new Date(tweets[i].created_at);
        str = str + formatDate(date).toString() + '\n';
        str = str + tweets[i].text + '\n';
    }
    // Выводим результат на экран часов
    // ...

    var i = 1;
    var timerId = setInterval(function() {
        process.stdout.write(str[i]);
        if (i == str.length-1) clearInterval(timerId);
        i++;
    }, 100);
    print('Конец');
};
