'use strict';

const getTweets = require('./getTweets');
const formatDate = require('./formatDate');
const print = require('./print');

function tweetsToString() {
    const lines = [];

    for (let tweet of getTweets('#urfu-testing-2017')) {
        lines.push(`${formatDate(tweet.created_at)}\n${tweet.text}\n`);
    }

    return lines.join('\n');
}

exports.showTweets = () => {
    print(tweetsToString());
};

exports.showRunningLine = () => {
    let index = 0;
    const tweetsString = tweetsToString();

    let intervalId = setInterval(() => {
        if (index === tweetsString.length - 1) {
            clearInterval(intervalId);
        }

        process.stdout.write(tweetsString[index++]);
    });
};
