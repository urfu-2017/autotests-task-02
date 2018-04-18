const proxyquire = require('proxyquire');
const assert = require('assert');
const sinon = require('sinon');
const whatTimeIsIt = new Date('2018-04-18T23:59:59.609Z');

const showTweets = (tweets = []) => {
    const formatDate = sinon.stub();
    formatDate.withArgs('2018-18-04T12:00:05.123Z').returns('12:00');
    formatDate.withArgs('2018-17-04T12:00:05.123Z').returns('вчера в 12:00');
    formatDate.withArgs('2018-01-01T12:00:05.123Z').returns('1 января в 12:00');
    formatDate.withArgs('2017-01-01T12:00:05.123Z').returns('1 января 2017 года в 12:00');

    const print = sinon.spy();

    proxyquire(
        '../lib/index',
        {
            './getTweets': () => tweets,
            './formatDate': formatDate,
            './print': print
        }
    )();

    return print;
}

describe('showTweets', () => {
    /*it ('should print a tweet', () => {
        const actual = showTweets([
            {
                created_at: '2018-04-18T12:00:05.123Z',
                text: 'This is tweet sample'
            }
        ]);

        assert.ok(actual.calledWith('12:00\nThis is tweet sample'));
    });

    it ('should print three tweets in reverse order', () => {
        const actual = showTweets([
            {
                created_at: '2018-04-17T12:00:05.123Z',
                text: 'This is yesterday tweet sample'
            },
            {
                created_at: '2018-02-02T12:00:05.123Z',
                text: 'This is February tweet sample'
            },
            {
                created_at: '2017-01-01T12:00:05.123Z',
                text: 'This is last year\'s January tweet sample'
            }
        ]);

        assert.ok(actual.calledWith('вчера в 12:00\nThis is yesterday tweet sample'));
        assert.ok(actual.calledWith('2 февраля в 12:00\nThis is February tweet sample'));
        assert.ok(actual.calledWith('1 января 2017 года в 12:00\nThis is last year\'s January tweet sample'));
    })*/

    it ('should not print anything', () => {
        const actual = showTweets();
        // а там пусто
        assert.ok(actual.notCalled);
    })
});

describe('formatDate', () => {
    const formatDate = require('../lib/formatDate');
    let clock = null;
    before(() => {
        clock = sinon.useFakeTimers(whatTimeIsIt);
    });
    describe('Positive', () => {
        [
            { date: '2018-04-18T12:00:05.123Z', expected: '12:00' },
            { date: '2018-04-17T12:00:05.123Z', expected: 'вчера в 12:00' },
            { date: '2018-02-02T12:00:05.123Z', expected: '2 февраля в 12:00' },
            { date: '2017-01-01T12:00:05.123Z', expected: '1 января 2017 года в 12:00' }
        ].forEach(({ date, expected }) =>
            it(`should return ${expected} for ${date}`, () => {
                const actual = formatDate(date);
                assert.equal(actual, expected);
            })
        );
    });

    describe('Negative', () => {
        [
            { date: '~', error: 'Argument `date` is invalid' },
            { date: '', error: 'Argument `date` is invalid' },
            { date: null, error: 'Argument `date` is invalid' },
            { date:  '2049-12-31T12:00:05.123Z', error: '`date` can not be from the future' },
            { date: '2018-60-31T12:00:05.123Z', error: 'Some part of argument `date` is out of range' },
            { date: '2018-12-31T12:99:05.123Z', error: 'Some part of argument `date` is out of range' },
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