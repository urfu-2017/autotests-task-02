const getTweets = require('./getTweets');
const formatDate = require('./formatDate');
const print = require('./print');

module.exports = function showTweets() {
    // Получаем список твитов
    const tweets = getTweets('#urfu-testing-2017');

    // Производим манипуляции с датой
    const formatedDateTweets = tweets.map(tweet => ({
        ...tweet,
        date: formatDate(tweet.created_at)
    }));

    // Выводим результат на экран часов
    formatedDateTweets.forEach(tweet => {
        print(`${tweet.date}\n${tweet.text}`)
    });
};
