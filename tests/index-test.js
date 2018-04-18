const proxyquire = require('proxyquire');
const assert = require('assert');
const sinon = require('sinon');
const formatDate = require('../lib/formatDate')

describe('showTweets', () => {
    // Этот тест написан для примера, его можно удалить
    it('should print `Конец` after tweets', () => {
        const print = sinon.spy();
        const showTweets = proxyquire(
            '../lib/index',
            { './print': print }
        );

        showTweets();
        assert.ok(print.callCount === 5);
        assert.ok(print.calledWith('Конец'));
    });
});

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

