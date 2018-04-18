const proxyquire = require('proxyquire');
const assert = require('assert');
const sinon = require('sinon');

const showTweets = (tweets = []) => {
    const formatDate = sinon.stub();
    formatDate.withArgs('2018-04-11T01:00:10.609Z').returns('01:00');
    formatDate.withArgs('2018-03-11T01:00:10.609Z').returns('вчера в 01:00');
    formatDate.withArgs('2018-02-11T01:00:10.609Z').returns('2 ноября в 01:00');

    const print = sinon.spy();

    proxyquire(
        '../lib/index',
        {
            './getTweets': () => tweets,
            './formatDate': formatDate,
            './print': print
        }
    )();

    return print;
}

describe('showTweets', () => {
    it ('should print one tweet', () => {
        const actual = showTweets([
            {
                created_at: '2018-04-11T01:00:10.609Z',
                text: 'Tweet text'
            }
        ]);

        assert.ok(actual.calledWith('01:00\nTweet text'));
    });

    it ('should print two tweets', () => {
        const actual = showTweets([
            {
                created_at: '2018-03-11T01:00:10.609Z',
                text: 'Tweet text 1'
            },
            {
                created_at: '2018-02-11T01:00:10.609Z',
                text: 'Tweet text 2'
            }
        ]);

        assert.ok(actual.calledWith('вчера в 01:00\nTweet text 1'));
        assert.ok(actual.calledWith('2 ноября в 01:00\nTweet text 2'));
    })

    it ('should print nothing', () => {
        const actual = showTweets();

        assert.ok(actual.notCalled);
    })
});
