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
        process.stdout.write(str[i++]);
        if (i === str.length)
            clearInterval(timerId);
    }, 100);

    print(tweets);

    return tweets;
};
