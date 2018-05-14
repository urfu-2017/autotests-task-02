const getTweets = require('./getTweets');
const formatDate = require('./formatDate');
const print = require('./print');

module.exports = function showTweets() {
    // Получаем список твитов
    const tweets = getTweets('#urfu-testing-2017');
    let result = '';

    tweets.forEach(element => {
        let date = formatDate(element.created_at);
        result += date + '\n' + element.text + '\n\n';
    });
    print(result);

    return result;
};
