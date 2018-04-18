const getTweets = require('./getTweets');
const formatDate = require('./formatDate');
const print = require('./print');

module.exports = function showTweets() {
    // Получаем список твитов
    const tweets = getTweets('#urfu-testing-2017');

    // Производим манипуляции с датой
    for (var i in tweets){
        tweets[i]['created_at'] = formatDate(tweets[i]['created_at']);
    }

    // Выводим результат на экран часов
    for (var i in tweets){
        print(tweets[i]['created_at'] + '\n' + tweets[i]['text'] + '\n');
    }
};
