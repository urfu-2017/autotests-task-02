const getTweets = require('./getTweets');
const formatDate = require('./formatDate');
const print = require('./print');

module.exports = function showTweets() {
    const tweets = getTweets('#urfu-testing-2017');
    if(tweets.length === 0) {
        return [];
    }

    tweets.forEach(tweet => tweet['created_at'] = formatDate(tweet['created_at']));

    print(tweets);

    return tweets;
};
