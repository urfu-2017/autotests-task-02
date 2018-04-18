const getTweets = require('./getTweets')
const formatDate = require('./formatDate')
const print = require('./print')


function getFormattedTweets(tag, delim) {
    return getTweets(tag)
        .map(tweet => Object.assign(tweet, {fdate: formatDate(tweet.created_at) }))
        .map(tweet => tweet.fdate + delim + tweet.text)
        .join(delim + delim)
}


module.exports.showTweets = () => {
    print(getFormattedTweets('#urfu-testing-2017', '\n'))
}


module.exports.showTweetsTicker = () => {
    const tweetString = getFormattedTweets('#urfu-testing-2017', '\n')
    const iterator = tweetString[Symbol.iterator]()
    const interval = setInterval(() => {

        const next = iterator.next()
        if (next.done) {
            clearInterval(interval)
        }
        else {
            print(next.value)
        }

    }, 100)
}