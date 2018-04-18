const getTweets = require('./getTweets');
const formatDate = require('./formatDate');
const print = require('./print');

module.exports = function showTweets() {

    const tweets = getTweets('#urfu-testing-2017');
    for (var i=0; i<tweets.length; i++){
        var date = tweets[i].created_at;
        print(formatDate(date));
        print(tweets[i].text );
    }
    print('Конец');
    
};
