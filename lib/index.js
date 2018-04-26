const getTweets = require('./getTweets');
const formatDate = require('./formatDate');
const print = require('./print');

module.exports = function showTweets() {
    const tweets = getTweets('#urfu-testing-2017');

    tweets.forEach(function (tweet) {
        tweet.created_at = formatDate(tweet.created_at);
    });

    tweets.forEach(tweet =>{
        print(`${tweet.created_at}\n${tweet.text}\n`);
    });

    print('Конец');
};
