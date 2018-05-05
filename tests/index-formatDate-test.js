const assert = require('assert');
const sinon = require('sinon');
const formatDate = require('../lib/formatDate');

function runSuccessTest(date, expected) {
    return () => {
        const actual = formatDate(date);

        assert.equal(actual, expected);
    }
}

describe('formatDate positive', () => {
    let clock;

    afterEach(() => {
        if (clock) {
            clock.restore();
        }
    });

    it('should return current time for now', () => {
        const date = new Date();
        runSuccessTest(date, date.toLocaleString("ru", {hour: 'numeric', minute: 'numeric'}));
    });


    it('should return `00:00` for today at midnight', () => {
        const date = new Date();
        const tweetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0);
        runSuccessTest(tweetDate, '00:00');
    });

    it('should return `вчера в 23:59` for yesterday at 11:59 p.m.', () => {
        const startDate = new Date(2018, 4, 15).getTime();
        clock = sinon.useFakeTimers(startDate);

        const tweetDate = new Date(2018, 4, 14, 23, 59);
        runSuccessTest(tweetDate, 'вчера в 23:59');
    });

    it('should return `вчера в 00:00` for yesterday midnight', () => {
        const startDate = new Date(2018, 3, 20).getTime();
        clock = sinon.useFakeTimers(startDate);

        const tweetDate = new Date(2018, 3, 19, 0, 0);
        runSuccessTest(tweetDate, 'вчера в 00:00');
    });

    it('should return `1 января в 00:00` for 1 January this year', () => {
        const date = new Date();
        date.setMonth(0, 1);
        date.setHours(0, 0);
        runSuccessTest(date.toString(), '1 января в 00:00');
    });

    it('should return `31 декабря 2017 года в 23:59` for 31 December last year', () => {
        const startDate = new Date(2018, 1, 1).getTime();
        clock = sinon.useFakeTimers(startDate);

        runSuccessTest('2017-12-31T00:00:00.123Z', '31 декабря 2017 года в 23:59');
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