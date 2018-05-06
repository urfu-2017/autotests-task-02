const proxyquire = require('proxyquire');
const assert = require('assert');
const sinon = require('sinon');
const moment = require('moment');
const formatDate = require('../lib/formatDate');
const today = moment();

describe('Проверка даты', () => {
    [
        { date: '', expected: /Not valid date/ },
        { date: 'Дата', expected: /Not valid date/ },
        { date : '2019-01-05T12:00:10.123Z', expected : /The entered date is in the future/},].forEach(({ date, expected }) =>
    it(`should throw error '${expected}' for '${date}'`, ()=> {
        assert.throws(() => formatDate(date), expected );
    }));

    [
        { date: moment(today).startOf('day').utc().format(), expected: '00:00' },
        { date: moment(today).startOf('day').add(1, 'minute').utc().format(), expected: '00:01' },
        { date: moment(today).startOf('day').subtract(1, 'day').utc().format(), expected: 'вчера в 00:00' },
        { date: moment(today).subtract(1, 'day').utc().format(), expected: `вчера в ${moment(today).format('HH:mm')}` },
        { date: moment(today).subtract(1, 'month').format(), expected: `${moment(today).subtract(1, 'month').locale('ru').format('DD MMMM [в] HH:mm')}`},
        { date: moment(today).subtract(1, 'year').format(), expected: `${moment(today).subtract(1, 'year').locale('ru').format('DD MMMM YYYY [года в] HH:mm')}`},
        ].forEach(({ date, expected }) =>
            it(`should return ${expected} for ${date}`, () => {
                const actual = formatDate(date);
                assert.equal(actual, expected);
            })
        );
});
