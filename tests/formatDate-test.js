'use strict';
const formatDate = require('../lib/formatDate');
const assert = require('assert');

var test1 = new Date('2015-04-11T15:09:10.609Z')
var now = new Date();
var hh = now.getUTCHours();
if (hh<10)
    hh = '0'+hh;
var mm = now.getUTCMinutes();
if (mm<10)
    mm = '0'+mm;

[
    { date: now, expected: `${hh}:${mm}` },
    { date: now, expected: `${hh}:${mm}` },
    { date: test1, expected: '11 Апреля 2015 года в 15:09' },

].forEach(({ date, expected }) =>
    it(`should return ${expected} for ${date}`,
        () => {
            const actual = formatDate(date);

            assert.equal(actual, expected);
        }
    )
);
[
    { date: 'e', expected: 'Invalid argument' },
    { date: [now,test1], expected: 'More than one argument' }

].forEach(({ date, expected }) =>
    it(`should throw error ${expected} for ${date}`,
        () => {
            const actual = () => formatDate(date);
            assert.throws(actual, expected);
        }
    )
);
