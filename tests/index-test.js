const proxyquire = require('proxyquire');
const assert = require('assert');
const sinon = require('sinon');
const formatDate = require('../lib/formatDate');

describe('showTweets', () => {
    it('should calls `print` one time', () => {
        const print = sinon.spy();
        proxyquire('../lib/index', {
            './print': print
        })();

        assert.ok(print.calledOnce);
    });

    it('should calls `formatDate` n times', () => {
        const formatDate = sinon.spy();
        proxyquire('../lib/index', {
            './getTweets': () => [
                {
                    created_at: '',
                    text: ''
                },
                {
                    created_at: '',
                    text: ''
                },
                {
                    created_at: '',
                    text: ''
                }
            ],

            './formatDate': formatDate
        })();

        assert.equal(formatDate.callCount, 3);
    });

    it('should return empty array if there aren`t tweets', () => {
        const print = sinon.spy();
        const tweets = proxyquire('../lib/index', {
            './print': print,
            './getTweets': () => []
        })();

        print(tweets);
        sinon.assert.calledWith(print, sinon.match.array.deepEquals([]));
    });

});