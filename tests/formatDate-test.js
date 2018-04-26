const proxyquire = require('proxyquire');
const assert = require('assert');
const sinon = require('sinon');
const moment = require('moment');

const formatDate = require('../lib/formatDate');

const dataPositive = [
    { time: '2018-04-11T15:09:10.609Z', expected: '11 апреля в 15:09' },
    { time: '2016-12-25T12:00:10.123Z', expected: '25 декабря 2016 года в 12:00' },
    { time: '2018-04-13T15:00:10.123Z', expected: 'вчера в 15:00' },
    { time: '2018-04-14T12:21:10.123Z', expected: '12:21' },
    { time: '2018-02-11T15:09:10.609Z', expected: '11 февраля в 15:09' },
    { time: '2018-02-11T00:10:10.609Z', expected: '11 февраля в 00:10' },
    { time: '2019-02-11T00:10:10.609Z', expected: '11 февраля 2019 года в 00:10' }
];

const dataNegative = [
    { time: undefined, expected: /Invalid date/ },
    { time: null, expected: /Invalid date/ },
    { time: [], expected: /Invalid date/ },
    { time: {}, expected: /Invalid date/ },
    { time: Infinity, expected: /Invalid date/ },
    { time: NaN, expected: /Invalid date/ }
];

describe('formatDate', () => {
    let clock;
    beforeEach(() => {
        const startDate = new Date(2018, 3, 14, 14, 43).getTime();
        clock = sinon.useFakeTimers(startDate);
    });
    afterEach(() => {
        clock.restore();
    });
    describe('positive', () => {
        dataPositive.forEach(({time, expected}) => {
            it(`should print '${expected}' for ${time}`, () => {
                const actual = formatDate(time);
                assert.equal(actual, expected);
            });
        });
    });
    describe('negative', () => {
        dataNegative.forEach(({time, expected}) => {
            it(`should print '${expected}' for ${time}`, () => {
                const actual = () => formatDate(time);
                assert.throws(actual, expected);
            });
        });
    });
});
