'use strict';

const getTweets = require('./getTweets');
const formatDate = require('./formatDate');
const print = require('./print');

module.exports = function showTweets() {
function tweetsToString(){
	const lines = [];
	for(let tweet of getTweets('#urfu-testing-2017')){
		lines.push(`${formatDate(tweet.created_at)}\n${tweet.text}\n`);
	}

	return lines.join('\n');

}

exports.showTweets = () => {
	print(tweetsToString());
};

exports.showRunningLine = () => {
	let index = 0;
	const tweetString = tweetsToString();
    // Производим манипуляции с датой
    // ...

    // Выводим результат на экран часов
    // ...
    process.stdout.write(tweetsString[index++]);
	};
};
