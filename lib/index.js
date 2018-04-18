const getTweets = require('./getTweets');
const { formatDate } = require('./formatDate');
const print = require('./print');

module.exports = async function showTweets() {
    const tweets = getTweets('#urfu-testing-2017');
    for(let i = 0; i < tweets.length; i++) {
        const date = formatDate(tweets[i].created_at);
        await print(date);
        await print(tweets[i].text);
        await print('');
    }
    await print('Конец');
};
