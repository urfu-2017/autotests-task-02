const getTweets = require('./getTweets');
const formatDate = require('./formatDate');
const print = require('./print');
const creepingLine = require('./creepingLine');

module.exports = function showTweets() {
    let tweets = getTweets('#urfu-testing-2017');
    tweets.forEach(tweet => tweet['created_at'] = formatDate(tweet['created_at']));
    const text = tweets
        .map(tweet => tweet.text)
        .join('');
    creepingLine(text);
    print(tweets);
};
