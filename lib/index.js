const getTweets = require('./getTweets');
const formatDate = require('./formatDate');
const print = require('./print');


module.exports = function showTweets() {
    // Получаем список твитов
    const tweets = getTweets('#urfu-testing-2017');
    
    // Производим манипуляции с датой
    // ...
    for(let i=0;i<tweets.length; i++ ){
        print(formatDate(tweets[i].created_at) + ': ' +  tweets[i].text);
    }
    // Выводим результат на экран часов
    // ...
  };

