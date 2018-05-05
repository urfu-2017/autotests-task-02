const getTweets = require('./getTweets');
const formatDate = require('./formatDate');
const print = require('./print');

module.exports = function showTweets() {
    // Получаем список твитов
    const tweets = getTweets('#urfu-testing-2017');

    result = "";
    for (var i=0; i < tweets.length; i++){
        result += formatDate(tweets[i].created_at) +"\n"+ tweets[i].text +"\n\n";
    }
    print(result);
    return result;
};