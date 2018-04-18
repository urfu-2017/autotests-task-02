const assert = require('assert');
const formatDate = require('../lib/formatDate');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

function runSuccessTest(date, expected){
    return () => {
        const getToday = sinon.stub();
        getToday.withArgs().returns(new Date('2018-04-18T15:33:10.609Z'));

        const formatDate = proxyquire('../lib/formatDate', {
            '../lib/getToday': getToday
        });
        const actual = formatDate(date);
        assert.equal(actual, expected)
    }
}

describe('Positive tests for formatDate', () => {
    it('should return `10:33` for `10:33 2018-04-18`',
        runSuccessTest('2018-04-18T10:33:10.609Z', '10:33')
    );
    it('should return `вчера в 15:33` for `15:33 2018-04-17`',
        runSuccessTest('2018-04-17T15:33:10.609Z', 'вчера в 15:33')
    );
    it('should return `16 апреля в 15:33` for `15:33 2018-04-16`',
        runSuccessTest('2018-04-16T15:33:10.609Z', '16 апреля в 15:33')
    );
    it('should return `10 февраля в 09:30` for `09:30 2018-02-10`',
        runSuccessTest('2018-02-10T09:30:10.609Z', '10 февраля в 09:30')
    );
    it('should return `31 декабря 2017 года в 09:30` for `09:30 2017-12-31`',
        runSuccessTest('2017-12-31T09:30:10.609Z', '31 декабря 2017 года в 09:30')
    );
    it('should return `1 января в 09:30` for `09:30 2018-01-01`',
        runSuccessTest('2018-01-01T09:30:10.609Z', '1 января в 09:30')
    );
    it('should return `31 декабря 2016 года в 09:30` for `09:30 2016-12-31`',
        runSuccessTest('2016-12-31T09:30:10.609Z', '31 декабря 2016 года в 09:30')
    );
    it('should return `1 января 2017 года в 09:30` for `09:30 2017-01-01`',
        runSuccessTest('2017-01-01T09:30:10.609Z', '1 января 2017 года в 09:30')
    );
    it('should return `15 августа 2017 года в 09:30` for `09:30 2017-08-15`',
        runSuccessTest('2017-08-15T09:30:10.609Z', '15 августа 2017 года в 09:30')
    );
    it('should return `00:00` for `00:00 2018-04-18`',
        runSuccessTest('2018-04-18T00:00:10.609Z', '00:00')
    );
    it('should return `вчера в 23:59` for `23:59 2018-04-17`',
        runSuccessTest('2018-04-17T23:59:10.609Z', 'вчера в 23:59')
    );
    it('should return `вчера в 00:01` for `00:01 2018-04-17`',
        runSuccessTest('2018-04-17T00:01:10.609Z', 'вчера в 00:01')
    );
    it('should return `31 декабря 2017 года в 23:59` for `23:59 2017-12-31`',
        runSuccessTest('2017-12-31T23:59:10.609Z', '31 декабря 2017 года в 23:59')
    );
    it('should return `1 января в 00:01` for `00:01 2018-01-01`',
        runSuccessTest('2018-01-01T00:01:10.609Z', '1 января в 00:01')
    );
    it('should return `1 февраля в 15:33` for `15:33 2018-02-01`',
        runSuccessTest('2018-02-01T15:33:10.609Z', '1 февраля в 15:33')
    );
    it('should return `31 января в 15:33` for `15:33 2018-01-31`',
        runSuccessTest('2018-01-31T15:33:10.609Z', '31 января в 15:33')
    );
});

function runNegativeTest(date, error) {
    return () => {
        const actual = () => formatDate(date);
        assert.throws(actual, error);
    }
}

describe('Negative tests for formatDate', () => {
    it('should throw error for empty parameter', () => {
        const actual = () => formatDate();
        assert.throws(actual, /Функцию formatDate нельзя вызвать без аргументов./);
    });
    it('should throw error when parameter is not string',
        runNegativeTest (new Date(),
            /Передайте на вход дату строкой в формате yyyy-mm-ddThh:mm:ss.sssZ./)
    );
    it('should throw error when parameter is not date',
        runNegativeTest ('Hello, i am date',
            /Дата должна быть в формате yyyy-mm-ddThh:mm:ss.sssZ/)
    );
    it('should throw error for 32 day of month',
        runNegativeTest ('2018-02-32T15:33:10.609Z',
            /Некорректная дата./)
    );
    it('should throw error for 13 month of year',
        runNegativeTest ('2018-13-12T15:33:10.609Z',
            /Некорректная дата./)
    );
    it('should throw error for 0 month of year',
        runNegativeTest ('2018-00-12T15:33:10.609Z',
            /Некорректная дата./)
    );
    it('should throw error for 0 day of month',
        runNegativeTest ('2018-11-00T15:33:10.609Z',
            /Некорректная дата./)
    );
    it('should throw error for 24 hour of day',
        runNegativeTest ('2018-11-12T24:33:10.609Z',
            /Некорректная дата./)
    );
    it('should throw error for 60 minute of hour',
        runNegativeTest ('2018-11-12T12:60:10.609Z',
            /Некорректная дата./)
    );
    it('should throw error for 60 second of minute',
        runNegativeTest ('2018-11-12T12:15:60.609Z',
            /Некорректная дата./)
    );
    it('should throw error for date less then 21.03.2016 (start twitter)',
        runNegativeTest ('2005-11-12T12:15:10.609Z',
            /Слишком ранняя дата. Дата должна быть позже 21.03.16./)
    );
    it('should throw error for a date in other format',
        runNegativeTest ('2018-03-12',
            /Дата должна быть в формате yyyy-mm-ddThh:mm:ss.sssZ/)
    );
    it('should throw error for a future date',() => {
        const getToday = sinon.stub();
        getToday.withArgs().returns(new Date('2018-04-18T15:33:10.609Z'));

        const formatDate = proxyquire('../lib/formatDate', {
            '../lib/getToday': getToday
        });
        const actual = () => formatDate('2018-04-18T18:33:10.609Z');
        assert.throws(actual, /Дата должна быть меньше текущей./);
    });
});
