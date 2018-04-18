const getTweets = require('./getTweets');
const formatDate = require('./formatDate');
const print = require('./print');

module.exports = function showTweets() {
    // Получаем список твитов
    const tweets = getTweets('#urfu-testing-2017');

    // Производим манипуляции с датой
    // ...
    tweets.forEach(element => {
        var date = formatDate(element.created_at);
        //print(date);
        //print(element.text);
    });

    // Выводим результат на экран часов
    // ...
    print('lala');
    print('Конец');
};
