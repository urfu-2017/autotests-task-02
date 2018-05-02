const getTweets = require('./getTweets');
const formatDate = require('./formatDate');
const print = require('./print');

module.exports = function showTweets() {
    const tweets = getTweets('#urfu-testing-2017');

    tweets.forEach(({ created_at, text }) => {
        print(formatDate(created_at));
        print(text);
    });

};
