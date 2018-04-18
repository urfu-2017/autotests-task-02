const getTweets = require('./getTweets');
const formatDate = require('./formatDate');
const print = require('./print');

module.exports = function showTweets() {
    // Получаем список твитов
    const tweets = getTweets('#urfu-testing-2017');

    // Производим манипуляции с датой
    // ...
    const d0 = formatDate(tweets[0].created_at);
    const d1 = formatDate(tweets[1].created_at);

    // Выводим результат на экран часов
    // ...
    print(d0);
    print(tweets[0].text + "\n");
    print(d1);
    print(tweets[1].text + "\n");
    print('Конец');
};
