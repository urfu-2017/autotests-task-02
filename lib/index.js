const getTweets = require('./getTweets');
const formatDate = require('./formatDate');
const print = require('./print');;

module.exports = function showTweets() {
    const tweets = getTweets('#urfu-testing-2017');
    for (let tweet of tweets)
    {
        print(formatDate(new Date(tweet.created_at)));
        print(tweet.text);
    }
};