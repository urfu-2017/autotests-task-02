'use strict';
const assert = require('assert');
const moment = require('moment');
const proxyquire = require('proxyquire');
const tk = require('timekeeper');
const sinon = require('sinon');

const fDate = require('../lib/formatDate');

describe('showTweets', () => {
    // Этот тест написан для примера, его можно удалить
    it('should print `Конец` after tweets', () => {
    it('calls print only once', () => {
        const print = sinon.spy();
        const showTweets = proxyquire(
            '../lib/index',
            { './print': print }
        );
        const lib = proxyquire('../lib/index', {
            './print': print
        });
 
        showTweets();
        lib.showTweets();
 
        assert.ok(print.calledOnce);
        assert.ok(print.calledWith('Конец'));
     });

    it('should return empty string if there no tweets', () => {
        const print = sinon.spy();
        const lib = proxyquire('../lib/index', {
            './print': print,
            './getTweets': () => []
        });

        lib.showTweets();

        sinon.assert.calledWith(print, sinon.match(''));
    });

    it('should print in format "(<tweet.created_at>\\n<tweet.text>\\n)+"', () => {
        const print = sinon.spy();
        const lib = proxyquire('../lib/index', {
            './print': print,
            './formatDate': date => date,
            './getTweets': () => [
                {
                    created_at: 1,
                    text: '1'
                },
                {
                    created_at: 2,
                    text: '2'
                },
                {
                    created_at: 3,
                    text: '3'
                }
            ]
        });

        lib.showTweets();

        sinon.assert.calledWith(print, sinon.match('1\n1\n\n2\n2\n\n3\n3'));
    });
});

describe('formatDate', () => {
    const now = 1523536928232; // 2018.04.12 12:42:08.232
    const testCases = [
        { arg: now, expected: '12:42' },
        { arg: moment(now).startOf('day').toDate(), expected: '00:00' },
        { arg: moment(now).subtract(1, 'days').toDate(), expected: 'Вчера в 12:42' },
        { arg: moment(now).subtract(1, 'days').startOf('day').toDate(), expected: 'Вчера в 00:00' },
        { arg: moment(now).subtract(2, 'days').toDate(), expected: '10 апреля в 12:42' },
        { arg: moment(now).subtract(1, 'months').toDate(), expected: '12 марта в 12:42' },
        { arg: moment(now).subtract(2, 'months').toDate(), expected: '12 февраля в 12:42' },
        { arg: moment(now).subtract(1, 'years').toDate(), expected: '12 апреля 2017 года в 12:42' },
        { arg: moment(now).startOf('year').toDate(), expected: '01 января в 00:00' },
        { arg: {}, expected: 'Invalid date' },
        { arg: [], expected: 'Invalid date' },
        { arg: undefined, expected: 'Invalid date' },
        { arg: null, expected: 'Invalid date' },
        
    ];

    before(() => tk.freeze(now));

    testCases.forEach(testCase => {
        it(`should return '${testCase.expected}' for ${JSON.stringify(testCase.arg)}`, () => {
            assert.equal(formatDate(testCase.arg), testCase.expected);
        });
    });

    after(() => tk.reset());
});