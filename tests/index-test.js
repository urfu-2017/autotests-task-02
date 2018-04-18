const proxyquire = require('proxyquire');
const assert = require('assert');
const sinon = require('sinon');
const formatDate = require('../lib/formatDate');

describe('showTweets', () => {
    it('should print `Конец` after tweets', () => {
        const print = sinon.spy();
        const showTweets = proxyquire(
            '../lib/index',
            {
                './print': print
            }
        );

        showTweets();

        assert.ok(print.calledWith('Конец'));
    });

    it('should print `вчера в 15:09` after tweets', () => {
        const formatDate = sinon.spy();
        const print = sinon.spy();
        const showTweets = proxyquire(
            '../lib/index',
            {
                './formatDate': formatDate,
                './print': print
            }
        );

        showTweets();

        assert.ok(formatDate.calledWith('2018-04-11T15:09:10.609Z'));
    });

    it('should return `incorrect data` for "kekeke"', () => {
        const actual = formatDate('kekeke');

        assert.equal(actual, 'incorrect data');
    });

    it('should return `incorrect data` for ""', () => {
        const actual = formatDate('');

        assert.equal(actual, 'incorrect data');
    });

    it('should return `incorrect data` for NaN', () => {
        const actual = formatDate(NaN);

        assert.equal(actual, 'incorrect data');
    });

    it('should return `incorrect data` for undefined', () => {
        const actual = formatDate(undefined);

        assert.equal(actual, 'incorrect data');
    });

    it('should return `25 марта в 15:09` for "2018-03-25T15:09:10.609Z"', () => {
        const actual = formatDate("2018-03-25T15:09:10.609Z");

        assert.equal(actual, '25 марта в 15:09');
    });

    it('should return `25 марта 2017 года в 16:09` for "2017-03-25T16:09:10.609Z"', () => {
        const actual = formatDate("2017-03-25T16:09:10.609Z");

        assert.equal(actual, '25 марта 2017 года в 16:09');
    });
});
