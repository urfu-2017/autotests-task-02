const proxyquire = require('proxyquire');
const assert = require('assert');
const sinon = require('sinon');
const time = require('luxon');
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
        let tweets = proxyquire('../lib/index', {
            './print': print,
            './getTweets': () => []
        })();

        print(tweets);
        sinon.assert.calledWith(print, sinon.match.array.deepEquals([]));
    });

});

describe('formatDate', () => {
    describe('positive', () => {
        let thisDay = time.DateTime.local();
        [
            { date: thisDay.set({ hour: 15, minute: 59}), expected: '15:59' },
            { date: thisDay.set({ day: thisDay.day - 1, hour: 15, minute: 58}).toISO(), expected: 'вчера в 15:58' },
            { date: thisDay.set({ day: 3, month: 2, hour: 15, minute: 58}).toISO(), expected: '3 февраля в 15:58' },
            { date: '2017-03-25T16:09:10.609Z', expected: '25 марта 2017 года в 16:09' }
        ].forEach(({ date, expected }) =>
            it(`should return ${expected} for ${date}`, () => {
                const actual = formatDate(date);

                assert.equal(actual, expected);
            })
        );
    }),

    describe('negative', () => {
        let thisDay = time.DateTime.local();
        [
            { cb: () => formatDate(new Date(), new Date()), message: 'number of arguments is not one' },
            { cb: () => formatDate(['207-0-25T16:0:10.60']), message: 'invalid date time' },
        ].forEach(({ cb, message }) =>
            it(`should throw error when date for ${message}`, () => {

                assert.throws(cb, message);
            })
        );
    })
})
