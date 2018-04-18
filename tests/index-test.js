const proxyquire = require('proxyquire');
const assert = require('assert');
const sinon = require('sinon');
const formatDate = require('../lib/formatDate');

describe('showTweets', () => {
    it('should print date and tweet', () => {
        const formatDate = sinon.stub();
        const print = sinon.spy();
        formatDate.withArgs('2018-04-11T15:09:10.609Z').returns('вчера в 15:09');
        formatDate.withArgs('2016-12-25T12:00:10.123Z').returns('25 марта 2016 года в 15:09');
        formatDate.throws('Illegal arguments');

        const showTweets = proxyquire('../lib/index', {
            './formatDate': formatDate,
            './print': print,
        });
        showTweets();

        var correct = "вчера в 15:09\n" +
            "Библиотека #nock позволяет не только удобно писать тесты, но и вести разработку фронтеда, в то время, когда бекенд ещё только проектируется! #urfu-testing-2017\n\n" +
            "25 марта 2016 года в 15:09\n" +
            "Для подмены модулей раньше я использовал #mockery, а сейчас всей душой полюбил #proxyquire. #urfu-testing-2017\n\n";
        assert.ok(print.calledOnce);
        assert.ok(print.calledWith(correct));
        });
});

function runSuccessTest(date, expected) {
    return () => {
        const actual = formatDate(date);

        assert.equal(actual, expected);
    }
}

describe('formatDate positive', () => {
    var date;
    beforeEach(() => {
        date = new Date();
    });

    it('should return current time for now', () => {
        runSuccessTest(date.toString(), date.toLocaleString("ru", {hour: 'numeric', minute: 'numeric'}));
    });


    it('should return `00:00` for today at midnight', () => {
        date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0);
        runSuccessTest(date.toString(), '00:00');
    });

    it('should return `вчера в 23:59` for yesterday at 11:59 p.m.', () => {
        date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1, 23, 59);
        runSuccessTest(date.toString(), 'вчера в 23:59');
    });

    it('should return `вчера в 00:00` for yesterday midnight', () => {
        date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1, 0, 0);
        runSuccessTest(date.toString(), 'вчера в 00:00');
    });

    it('should return `1 января в 00:00` for 1 January this year', () => {
        date.setMonth(0, 1);
        date.setHours(0, 0);
        runSuccessTest(date.toString(), '1 января в 00:00');
    });

    it('should return `31 декабря ' + ((new Date()).getFullYear() - 1) + ' года в 23:59` for 31 December last year', () => {
        date.getFullYear(date.getFullYear() - 1, 11, 31);
        date.setHours(23, 59);
        runSuccessTest(date.toString(), '31 декабря ' + date.getFullYear() + 'года в 23:59');
    });

    it('should return `25 июля 2016 года в 12:00` for 2016-07-25T12:00:10.123Z', () => {
        runSuccessTest('2016-07-25T12:00:10.123Z', '25 июля 2016 года в 12:00');
    });

});

describe('formatDate negative', () => {
    it('should throw error when do not pass parameters', () => {
        assert.throws(() => formatDate(), /undefined/);
    });
    it('should throw error when date is not string', () => {
        assert.throws(() => formatDate(5), /not string/);
    });
    it('should throw error when string is empty', () => {
        assert.throws(() => formatDate(''), /empty/);
    });
    it('should throw error when string is not date', () => {
        assert.throws(() => formatDate('abcd'), /Incorrect date format/);
    });
    it('should throw error when string is non-existent day', () => {
        assert.throws(() => formatDate('1999-03-32T12:00:10'), /Incorrect date format/);
    });
    it('should throw error when string is incorrect date format', () => {
        assert.throws(() => formatDate('2016-07-01T12-00-10'), /Incorrect date format/);
    });
    it('should throw error when string is incomplete date format', () => {
        assert.throws(() => formatDate('2000-09-25'), /Incorrect date format/);
    });
    it('should throw error when date is future time', () => {
        var date = new Date();
        date.setMonth(date.getMonth() + 1);
        assert.throws(() => formatDate(date.toString()), /future time/);
    });
});