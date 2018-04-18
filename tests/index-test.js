const proxyquire = require('proxyquire');
const assert = require('assert');
const sinon = require('sinon');
const formatDate = require('../lib/formatDate')
const getTweets = require('../lib/getTweets')

function getFromDateTest(inputDate, expectedDate) {
    return it(`should return '${expectedDate}' for [${inputDate}]`, () => {
        const actual = formatDate(inputDate);
        assert.equal(actual, expectedDate);
    });
}

describe('formatDate', () => {
    var now = new Date();
    var date = new Date();
    var month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля',
    'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    date.setDate(now.getDate() - 1);
    var minutes = now.getUTCMinutes();
    var time = `${now.getUTCHours()}:${minutes < 10 ? `0${minutes}` : minutes}`;
    
    getFromDateTest(date.toISOString(), `вчера в ${time}`);
    getFromDateTest(new Date().toISOString(), time);

    date.setDate(date.getDate() - 5);
    getFromDateTest(date.toISOString(), `${date.getUTCDate()} ${month[date.getUTCMonth()]} в ${time}`);

    date.setFullYear(2000);
    getFromDateTest(date.toISOString(),
    `${date.getUTCDate()} ${month[date.getUTCMonth()]} ${date.getUTCFullYear()} года в ${time}`);
})

