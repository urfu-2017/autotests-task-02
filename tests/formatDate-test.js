'use strict';

const assert = require('assert');
const moment = require('moment');
const tk = require('timekeeper');

const formatDate = require('../lib/formatDate');

describe('formatDate', () => {
    const now = new Date('2018.04.12 12:42:08.232').getTime();

    before(() => tk.freeze(now));

    [
        { arg: now, expected: '12:42' },
        { arg: moment(now).startOf('day').toDate(), expected: '00:00' },
        { arg: moment(now).subtract(1, 'days').toDate(), expected: 'Вчера в 12:42' },
        { arg: moment(now).subtract(1, 'days').startOf('day').toDate(), expected: 'Вчера в 00:00' },
        { arg: moment(now).subtract(2, 'days').toDate(), expected: '10 апреля в 12:42' },
        { arg: moment(now).subtract(1, 'months').toDate(), expected: '12 марта в 12:42' },
        { arg: moment(now).subtract(1, 'years').toDate(), expected: '12 апреля 2017 года в 12:42' },
        { arg: moment(now).startOf('year').toDate(), expected: '01 января в 00:00' }
    ].forEach(testCase =>
        it(`should return '${testCase.expected}' for ${JSON.stringify(testCase.arg)}`, () => {
            const actual = formatDate(testCase.arg);

            assert.equal(actual, testCase.expected);
        })
    );

    [
        { arg: {}, expectedError: /Invalid date/ },
        { arg: [], expectedError: /Invalid date/ },
        { arg: null, expectedError: /Invalid date/ },
        { arg: undefined, expectedError: /Invalid date/ }
    ].forEach(testCase =>
        it(`should raise '${testCase.expectedError}' for ${JSON.stringify(testCase.arg)}`, () => {
            assert.throws(() => formatDate(testCase.arg), testCase.expectedError);
        })
    );

    after(() => tk.reset());
});
