const getTweets = require('./getTweets');
const formatDate = require('./formatDate');
const print = require('./print');
const moment = require('moment');

module.exports = function showTweets() {

    const tweets = getTweets('#urfu-testing-2017');
    tweets.forEach(({ created_at, text }) => {
        print(formatDate(created_at));
        print(text);
    });
};
