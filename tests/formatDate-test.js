const time = require('luxon');
const assert = require('assert');
const formatDate = require('../lib/formatDate');

describe('formatDate', () => {
    describe('positive', () => {
        const currentDate = time.DateTime.local(2018, 5, 7, 15, 10);
        [
            { date: currentDate.set({ hour: 12, minute: 59 }), expected: '12:59' },
            { date: currentDate.set({ day: 6, hour: 12, minute: 59 }), expected: 'вчера в 12:59' },
            { date: currentDate.set({ day: 1, month: 1 }), expected: '1 января в 15:10' },
            { date: currentDate.set({ year: 2017 }), expected: '7 мая 2017 года в 15:10' }
        ].forEach(({ date, expected }) =>
            it(`should return ${expected} for ${date}`, () => {
                const actual = formatDate(date.toISO(), currentDate.toISO());
                assert.equal(actual, expected);
            })
        );
    }),

    describe('negative', () => {
        const thisDay = time.DateTime.local();
        it(`should throw error for invalid date time`, () => {
            const actual = () => formatDate(['207-0-25T16:0:10.60']);
            assert.throws(actual, 'invalid date time');
        })
    })
})
