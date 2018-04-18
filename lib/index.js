const getTweets = require('./getTweets');
const formatDate = require('./formatDate');
const print = require('./print');
const moment = require('moment');

module.exports = function showTweets() {
    // Получаем список твитов
    const tweets = getTweets('#urfu-testing-2017');

    // Выводим результат на экран часов
    for (let tweet of tweets) {
        if (moment().isBefore(new Date(tweet.created_at))) {
            throw Error("Tweet from future");
        }
        print(formatDate(new Date(tweet.created_at)));
        print(tweet.text);
    }
    print('Конец');
};
