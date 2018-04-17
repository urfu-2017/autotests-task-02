const getTweets = require('./getTweets');
const formatDate = require('./formatDate');
const print = require('./print');



module.exports = function showTweets() {
    // Получаем список твитов
    const tweets = getTweets('#urfu-testing-2017');

    for(let i = 0; i < tweets.length; i++)
        print(formatDate(tweets[i].created_at) + '\n' + tweets[i].text);
  };
