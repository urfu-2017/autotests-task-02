const time = require('luxon');
const assert = require('assert');
const formatDate = require('../lib/formatDate');

describe('formatDate', () => {
    describe('positive', () => {
        const thisDay = time.DateTime.local();
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
        const thisDay = time.DateTime.local();
        it(`should throw error when date for invalid date time`, () => {
            const actual = () => formatDate(['207-0-25T16:0:10.60']);
            assert.throws(actual, 'invalid date time');
        })
    })
})
