const _          = require('lodash')
const getTweets  = require('./getTweets')
const formatDate = require('./formatDate')
const print      = require('./print')


const formatTweet = _.template(
    '${ formatDate(created_at) }\n${ text }',

    { 'imports': { 'formatDate': formatDate } }
)


module.exports = function () {
    let tweets = getTweets('#urfu-testing-2017')

    print(tweets.map(formatTweet).join('\n\n'))
}
