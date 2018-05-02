'use strict';

const assert = require('assert');
const moment = require('moment');
const tk = require('timekeeper');

const formatDate = require('../lib/formatDate');

describe('formatDate', () => {
    const now = new Date('2018.04.12 12:42:08.232').getTime();
    const testCases = [
        { arg: now, expected: '12:42' },
        { arg: moment(now).startOf('day').toDate(), expected: '00:00' },
        { arg: moment(now).subtract(1, 'days').toDate(), expected: 'Вчера в 12:42' },
        { arg: moment(now).subtract(1, 'days').startOf('day').toDate(), expected: 'Вчера в 00:00' },
        { arg: moment(now).subtract(2, 'days').toDate(), expected: '10 апреля в 12:42' },
        { arg: moment(now).subtract(1, 'months').toDate(), expected: '12 марта в 12:42' },
        { arg: moment(now).subtract(1, 'years').toDate(), expected: '12 апреля 2017 года в 12:42' },
        { arg: moment(now).startOf('year').toDate(), expected: '01 января в 00:00' },
        { arg: {}, expected: 'Invalid date' },
        { arg: [], expected: 'Invalid date' },
        { arg: null, expected: 'Invalid date' },
        { arg: undefined, expected: 'Invalid date' },
    ];

    before(() => tk.freeze(now));

    testCases.forEach(testCase => {
        it(`should return '${testCase.expected}' for ${JSON.stringify(testCase.arg)}`, () => {
            const actual = formatDate(testCase.arg);

            assert.equal(actual, testCase.expected);
        });
    });

    after(() => tk.reset());
});
