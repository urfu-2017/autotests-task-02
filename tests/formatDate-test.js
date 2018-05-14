const proxyquire = require('proxyquire');
const assert = require('assert');
const sinon = require('sinon');
const moment = require('moment');
const formatDate = require('../lib/formatDate');
const testDay = new Date('2018-04-18T23:59:59.609Z');

describe('Data test', () => {
    var clock = null;
    before(() => {
        clock = sinon.useFakeTimers(testDay);
    });
    [
        { date: '', expected: /Not valid date/ },
        { date: 'Дата', expected: /Not valid date/ },
        { date : '2019-01-05T12:00:10.123Z', expected : /The entered date is in the future/},].forEach(({ date, expected }) =>
    it(`should throw error '${expected}' for '${date}'`, ()=> {
        assert.throws(() => formatDate(date), expected );
    }));

    [
        
        { date: moment(testDay).startOf('day').utc().format(), expected: '00:00' },
        { date: moment(testDay).startOf('day').add(1, 'minute').utc().format(), expected: '00:01' },
        { date: moment(testDay).startOf('day').subtract(1, 'day').utc().format(), expected: 'вчера в 00:00' },
        { date: moment(testDay).subtract(1, 'day').utc().format(), expected: `вчера в ${moment(testDay).format('HH:mm')}` },
        { date: moment(testDay).subtract(1, 'month').format(), expected: `${moment(testDay).subtract(1, 'month').locale('ru').format('DD MMMM [в] HH:mm')}`},
        { date: moment(testDay).subtract(1, 'year').format(), expected: `${moment(testDay).subtract(1, 'year').locale('ru').format('DD MMMM YYYY [года в] HH:mm')}`},
        ].forEach(({ date, expected }) =>
            it(`should return ${expected} for ${date}`, () => {
                const actual = formatDate(date);
                assert.equal(actual, expected);
            })
        );
        
    after(() => {
    clock.restore();
    });
});