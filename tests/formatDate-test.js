const assert = require('assert');
const formatDate = require('../lib/formatDate');
const sinon = require('sinon');

const NOW = new Date('2018-04-11T16:09:10.609Z');

describe('formatDate', () => {
    let clock = null;
    before(() => {
        clock = sinon.useFakeTimers(NOW);
    });
    describe('Positive tests', () => {
        [
            { date: '2018-04-11T15:09:10.609Z', expected: '15:09' },
            { date: '2018-04-10T15:09:10.609Z', expected: 'вчера в 15:09' },
            { date: '2018-03-25T15:09:10.609Z', expected: '25 марта в 15:09' },
            { date: '2017-03-25T15:09:10.609Z', expected: '25 марта 2017 года в 15:09' }
        ].forEach(({ date, expected }) =>
            it(`should return ${expected} for ${date}`, () => {
                const actual = formatDate(date);
                assert.equal(actual, expected);
            })
        );
    });

    describe('Negative tests', () => {
        [
            { date: 'abc', error: 'Argument `date` is invalid' },
            { date: '', error: 'Argument `date` is invalid' },
            { date:  '2018-05-11T15:09:10.609Z', error: '`date` can not be from the future' }
        ].forEach(({ date, error }) =>
            it(`should throw TypeError ${error} for ${date}`, () => {
                const actual = () => formatDate(date);
                assert.throws(actual, `${error}`);
            })
        );
    });

    after(() => {
        clock.restore();
    });
});