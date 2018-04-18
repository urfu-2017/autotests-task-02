const getTweets = require('./getTweets');
const formatDate = require('./formatDate');
const print = require('./print');

module.exports = function showTweets() {
    let tweets = getTweets('#urfu-testing-2017');
    if(tweets.length === 0) {
        return [];
    }

    tweets.forEach(tweet =>
        tweet['created_at'] = formatDate(tweet['created_at']
    ));

    let str = '';
    for (let i in tweets)
        str += tweets[i].text;

    let i = 0;
    let timerId = setInterval(() => {
        if (i === str.length)
            clearInterval(timerId);
        process.stdout.write(str[i++]);
    }, 100);

    print(tweets);

    return tweets;
};
