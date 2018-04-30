const getTweets = require('./getTweets');
const formatDate = require('./formatDate');
const print = require('./print');

module.exports = function showTweets() {
    const tweets = getTweets('#urfu-testing-2017');

    tweets.forEach(function (t) {
		t.created_at = formatDate(t.created_at);
	});
	
	tweets.forEach(function (t) {
		print(t);
	});
    
    print('Конец');
};
