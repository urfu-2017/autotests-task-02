const proxyquire = require('proxyquire');
const assert = require('assert');
const sinon = require('sinon');

describe('showTweets', () => {
    it('should print call counts 4 ', () => {
        const print = sinon.spy();
        const showTweets = proxyquire(
            '../lib/index',
            { './print': print }
        );

        showTweets();

        assert.equal(print.callCount, 4);
    });
});

const formatDate = require('../lib/formatDate');
const moment = require('moment');

describe('formatDate', () => {
    [
        { date: '', expected: 'Не корректная дата!' },
        { date: 'aaaa', expected: 'Не корректная дата!' },

        { date: moment().utc().add(1, 'days'), expected: 'Дата будущего!' },
    ].forEach(({ date, expected }) =>
        it(`should throw error '${expected}' for '${date}'`, ()=> {
            assert.throws(() => formatDate(date), expected);
        }));

    [
        { date: moment().utc().startOf('day').format(), expected: '0:00' },
        { date: moment().utc().startOf('day').add(1, 'minute').format(), expected: '0:01' },
        { date: moment().utc().endOf('day').subtract(1, 'day').format(), expected: 'вчера в 23:59' },
        { date: moment().utc().startOf('day').subtract(1, 'day').format(), expected: 'вчера в 0:00' },
        { date: moment().utc().subtract(1, 'day').format(), expected: `вчера в ${moment().utc().format('H:mm')}` },
        {
            date: moment().utc().subtract(1, 'month').format(),
            expected: `${moment().utc().subtract(1, 'month').locale('ru').format('DD MMMM [в] H:mm')}`
        },
        {
            date: moment().utc().subtract(1, 'year').format(),
            expected: `${moment().utc().subtract(1, 'year').locale('ru').format('DD MMMM YYYY [года в] H:mm')}`
        },
        {
            date:'2016-12-25T12:00:10.123Z',
            expected: '25 декабря 2016 года в 12:00'
        },
    ].forEach(({ date, expected }) =>
        it(`should return ${expected} for ${date}`, () => {
            const actual = formatDate(date);

            assert.equal(actual, expected);
        })
    );
});
