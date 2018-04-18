const _ = require('lodash')
const proxyquire = require('proxyquire')
const assert = require('assert')
const sinon = require('sinon')


const showTweets = (tweets = []) => {
    const print = sinon.spy()

    proxyquire(
        '../lib/index',
        {
            './formatDate': (date) => '00:00',
            './getTweets': () => tweets,
            './print': print
        }
    )()

    return print
}


describe('showTweets', () => {
    let examples = [
        {
            'title'  : 'there is no tweets',
            'tweets' : [],
            'expect' : ''
        },
        {
            'title'  : 'there is one tweet',
            'tweets' : [{
                'created_at': '00:00',
                'text': 'Hello'
            }],
            'expect' : '00:00\nHello'
        },
        {
            'title'  : 'there are two tweets',
            'tweets' : [{
                'created_at': '00:00',
                'text': 'Hello 1'
            }, {
                'created_at': '00:00',
                'text': 'Hello 2'
            }],
            'expect' : '00:00\nHello 1\n\n00:00\nHello 2'
        },
    ]

    _.each(examples, ({ title, tweets, expect }) => {
        let expectEscaped = expect.replace(/\n/g, "\\n")

        it(`should return \`${expectEscaped}\` when ${title}`, () => {
            let actual = showTweets(tweets)
            assert.ok(actual.calledWith(expect))
        })
    })
})
