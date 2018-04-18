const proxyquire = require('proxyquire');
const assert = require('assert');
const sinon = require('sinon');
const moment = require('moment');
const formatDate = require('../lib/formatDate');

describe('Проверка даты', () => {
    it('should return `Not valid date` for Дата', () => {
        try{
            formatDate('Дата');
            throw new Error('`formatDate` should throw error')
        } catch (error) {
            assert.equal(error.message, 'Not valid date');
        }
    });
    [
        { date: moment().startOf('day').utc().format(), expected: '00:00' },
        { date: moment().startOf('day').add(1, 'minute').utc().format(), expected: '00:01' },
        { date: moment().startOf('day').subtract(1, 'day').utc().format(), expected: 'вчера в 00:00' },
        { date: moment().subtract(1, 'day').utc().format(), expected: `вчера в ${moment().format('HH:mm')}` },
        { date: moment().subtract(1, 'month').format(), expected: `${moment().subtract(1, 'month').locale('ru').format('DD MMMM [в] HH:mm')}`},
        { date: moment().subtract(1, 'year').format(), expected: `${moment().subtract(1, 'year').locale('ru').format('DD MMMM YYYY [года в] HH:mm')}`},
        { date:'2016-10-05T12:00:10.123Z', expected: '05 октября 2016 года в 17:00'},
        ].forEach(({ date, expected }) =>
            it(`should return ${expected} for ${date}`, () => {
                const actual = formatDate(date);
                assert.equal(actual, expected);
            })
        );
});