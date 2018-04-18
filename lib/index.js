const getTweets = require('./getTweets');
const formatDate = require('./formatDate');
const print = require('./print');

module.exports = function showTweets() {
    // Получаем список твитов
    const tweets = getTweets('#urfu-testing-2017');

    // Производим манипуляции с датой
    if(tweets.length===0)
    {
        return [];
    }
     for(var i = 0; i < tweets.length; i++) {
         tweets[i]['created_at']=formatDate(tweets[i]['created_at']);
     }
    // Выводим результат на экран часов
     for(var i = 0; i < tweets.length; i++) {
         print(tweets[i]['created_at']);
         print(tweets[i]['text']);
     }

    print('Конец');
};