const getTweets = require('./getTweets');
const formatDate = require('./formatDate');
const print = require('./print');

module.exports = function showTweets() {
    // Получаем список твитов
    const tweets = getTweets('#urfu-testing-2017');
    for(var i = 0; i < tweets.length; i++)
    {
        // Производим манипуляции с датой
        // ...
        // Выводим результат на экран часов
        // ...
        print((formatDate(tweets[i]["created_at"]) + '\n' + tweets[i]["text"]).toString());
    }
};