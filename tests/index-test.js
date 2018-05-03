const proxyquire = require('proxyquire');
const assert = require('assert');
const sinon = require('sinon');
const formatDate = require('../lib/formatDate');

const NOW = new Date('2018-04-18T01:01:10.609Z');

describe('formatDate', () => {
    let clock = null;
    before(() => {
        clock = sinon.useFakeTimers(NOW);
    });
    describe('Positive tests', () => {
        [
            { date: '2018-04-18T00:01:10.609Z', expected: '00:01' },
            { date: '2018-04-17T00:01:10.609Z', expected: 'вчера в 00:01' },
            { date: '2018-03-25T00:01:10.609Z', expected: '25 марта в 00:01' },
            { date: '2017-03-25T00:01:10.609Z', expected: '25 марта 2017 года в 00:01' },
            { date: '2017-01-01T00:01:10.609Z', expected: '1 января 2017 года в 00:01' },
            { date: '2016-12-31T00:01:10.609Z', expected: '31 декабря 2016 года в 00:01' }
        ].forEach(({ date, expected }) =>
            it(`should return ${expected} for ${date}`, () => {
                const actual = formatDate(date);
                assert.equal(actual, expected);
            })
        );
    });

    describe('negative', () => {
        [
            { date: "", expected: /Date is not valid/ },
            { date: "1994-13-31T00:00:00.000Z", expected: /Date is not valid/ },
            { date: "9999-12-31T00:00:00.000Z", expected: /Tweet from future/ }
            ].forEach(({date, expected}) => {
            it(`should print '${expected}' for ${date}`, () => {
                const actual = () => formatDate(date);
                assert.throws(actual, expected);
            });
        });
    });

    after(() => {
        clock.restore();
    });
});

describe("showTweets", () => {
    before(() => {
        clock = sinon.useFakeTimers(NOW);
    });
    it("should print tweets", () => {
        const print = sinon.spy();
        const showTweets = proxyquire(
            "../lib/index",
            {
                "./print": print,
                "./getTweets": () => [
                    {
                        created_at: "2018-04-11T15:09:10.609Z",
                        text: 'Библиотека #nock позволяет не только удобно писать тесты, ' +
                        'но и вести разработку фронтеда, в то время, когда бекенд ещё ' +
                        'только проектируется! #urfu-testing-2017'
                    }
                ]
            }
        );
        showTweets();
        assert.ok(print.firstCall.calledWithExactly("11 апреля в 15:09"));
        assert.ok(print.secondCall.calledWithExactly('Библиотека #nock позволяет не только удобно писать тесты, ' +
        'но и вести разработку фронтеда, в то время, когда бекенд ещё ' +
        'только проектируется! #urfu-testing-2017'));
        assert.equal(print.callCount, 2);
    });
    after(() => {
        clock.restore();
    });
});