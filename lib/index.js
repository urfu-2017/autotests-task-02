const getTweets = require('./getTweets');
const formatDate = require('./formatDate');
const print = require('./print');

const showTweets = () => {
    const tweets = getTweets('#urfu-testing-2017') || [];

    if (tweets.length === 0) {
        console.log('Твитов по запросу не найдено');
        return;
    }

    tweets.forEach(tweet => tweet['created_at'] = formatDate(new Date(tweet['created_at'])));
    
    print(tweets);
};

module.exports = showTweets;