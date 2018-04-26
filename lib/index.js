const getTweets = require('./getTweets');
const formatDate = require('./formatDate');
const print = require('./print');

module.exports = function showTweets() {
    // Получаем список твитов
    const tweets = getTweets('#urfu-testing-2017');

    // Производим манипуляции с датой
    // ...
    const answer = tweets.reduce((answer, tweet) => {
        tweet.created_at = formatDate(tweet.created_at);
        answer += tweet.created_at + '\n' + tweet.text + '\n';
        return answer;
    }, '');

    // Выводим результат на экран часов
    // ...
    print(answer);
};
