const getTweets = require('./getTweets');
const formatDate = require('./formatDate');
const print = require('./print');

module.exports = function showTweets() {
    const tweets = getTweets('#urfu-testing-2017'); // Получаем твиты
    // Обрабатываем дату
    const processedDate = tweets.map(tweet => ({
        ...tweet,
        date: formatDate(tweet.created_at)
    }));
    // Выводим
    processedDate.forEach(tweet => {
        print(`${tweet.date}\n${tweet.text}`)
    });
};