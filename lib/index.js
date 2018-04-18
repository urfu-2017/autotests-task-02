const getTweets = require('./getTweets');
const formatDate = require('./formatDate');
const print = require('./print');

module.exports = function showTweets() {
    // Получаем список твитов
    const tweets = getTweets('#urfu-testing-2017');
    var twit;
    var date;
    // Производим манипуляции с датой
    // ...
    for(var i = 0; i < tweets.length; i++)
    {
        twit = tweets[i];
        date = twit["created_at"];
        text = formatDate(date) + '\n' + twit["text"];
    // Выводим результат на экран часов
    // ...
        print(text);
    }
};