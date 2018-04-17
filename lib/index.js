const getTweets = require('./getTweets');
const formatDate = require('./formatDate');
const print = require('./print');

module.exports = function showTweets() {
    // Получаем список твитов
    const tweets = getTweets('#urfu-testing-2017');

    // Производим манипуляции с датой
    // ...
    tweets.forEach(item =>{
        item.created_at=formatDate(item.created_at);
    })
    // Выводим результат на экран часов
    // ...
    tweets.forEach(item =>{
        print(item.created_at);
        print(item.text);
        print(' ');
    })
    print('Конец');
};