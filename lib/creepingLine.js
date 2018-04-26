const getTweets = require('./getTweets');
const print = require('./print');

module.exports = function creepingLine(text, cb) {
    let i = 0;
    const timerId = setInterval(() => {
        if (i === text.length)
            clearInterval(timerId);
        process.stdout.write(text[i++]);
    }, 100);
}