const assert = require('assert');
const formatDate = require('../lib/formatDate');

describe('formatDate', () => {
    const oldNow = Date.now;

    before(() => {
        Date.now = () => Date.parse('2018-11-05T17:14:00Z');
    });

    [
        { date: '', expected: 'Не корректная дата!' },
        { date: 'aaaa', expected: 'Не корректная дата!' },
        { date: '2019-11-05T00:00:00.123Z', expected: 'Дата будущего!' }
    ].forEach(({ date, expected }) =>
        it(`should throw error '${expected}' for '${date}'`, ()=> {
            assert.throws(() => formatDate(date), expected);
        }));

    [
        { date: '2018-11-05T00:00:00.123Z', expected: '0:00' },
        { date: '2018-11-05T00:01:00.123Z', expected: '0:01' },
        { date: '2018-11-04T23:59:00.123Z', expected: 'вчера в 23:59' },
        { date: '2018-11-04T00:00:00.123Z', expected: 'вчера в 0:00' },
        { date: '2018-10-05T18:10:00.123Z', expected: '05 октября в 18:10' },
        { date: '2017-10-05T18:10:00.123Z', expected: '05 октября 2017 года в 18:10' },
        { date: '2016-12-25T12:00:10.123Z', expected: '25 декабря 2016 года в 12:00' }
    ].forEach(({ date, expected }) =>
        it(`should return ${expected} for ${date}`, () => {
            const actual = formatDate(date);

            assert.equal(actual, expected);
        })
    );

    after(() => {
        Date.now = oldNow;
    });
});
