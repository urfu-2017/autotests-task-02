const getTweets = require('./getTweets');
const formatDate = require('./formatDate');
const print = require('./print');

module.exports = function showTweets() {
	var result = "";
	const tweets = getTweets('#urfu-testing-2017');
	for (var i=0; i < tweets.length; i++){
		if (i != tweets.length-1) {
			result += formatDate(tweets[i].created_at) + '\n' + tweets[i].text + '\n';
		}
		else {
			result += formatDate(tweets[i].created_at) + '\n' + tweets[i].text;
		}
	}
	print(result);
	return result;
};
