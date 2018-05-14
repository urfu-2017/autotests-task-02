const getTweets = require('./getTweets');
const formatDate = require('./formatDate');
const print = require('./print');

module.exports = function showTweets() {
    // Получаем список твитов
    const tweets = getTweets('#urfu-testing-2017');

    tweets.forEach(tweet => {
        // Производим манипуляции с датой
        tweet.created_at = formatDate(tweet.created_at);
        // Выводим результат на экран часов
        print(tweet.created_at);
        print(tweet.text);
        print();
    });
    print('Конец');
};
