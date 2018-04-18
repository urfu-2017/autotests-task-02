const proxyquire = require('proxyquire');
const assert = require('assert');
const sinon = require('sinon');
const formatDate = require('../lib/formatDate');
const moment = require('moment');

describe("showTweets", () => {
    // Этот тест написан для примера, его можно удалить
    it("should print `Конец` after tweets", () => {
        const print = sinon.spy();
        const showTweets = proxyquire(
            "../lib/index",
            { "./print": print }
        );

        showTweets();

        assert.ok(print.lastCall.calledWithExactly("Конец"));
    });

    it("should throw Tweet from future error", () => {
        const print = sinon.spy();
        const showTweets = proxyquire(
            "../lib/index",
            {
                "./print": print,
                "./getTweets": () => [
                    {
                        created_at: "3050-03-25T16:09:10.609Z",
                        text: "text"
                    }
                ]
            }
        );

        assert.throws(() => showTweets(), "Tweet from future");
    });

    it("should print tweets", () => {
        const print = sinon.spy();
        const showTweets = proxyquire(
            "../lib/index",
            {
                "./print": print,
                "./getTweets": () => [
                    {
                        created_at: "2017-03-25T16:09:10.609Z",
                        text: "text"
                    },
                    {
                        created_at: "2000-04-10T15:00:00.000Z",
                        text: "text2"
                    }
                ]
            }
        );

        showTweets();

        assert.ok(print.firstCall.calledWithExactly("25 марта 2017 года в 16:09"));
        assert.ok(print.secondCall.calledWithExactly("text"));
        assert.equal(print.callCount, 5);
    });
});

describe("formatDate", () => {
    [
        { date: "", error: "Date is not valid" },
        { date: "it is not date", error: "Date is not valid" }
    ].forEach(({ date, error }) =>
            it(`should throw "${error}" for "${date}"`, () => {
            assert.throws(() => formatDate(new Date(date)), error);
        }));

    [
        { date: moment().utc().startOf("day").format(), expectedResult: "00:00" },
        { date: moment().utc().startOf("day").add(1, "minute").format(), expectedResult: "00:01" },
        { date: moment().utc().startOf("day").subtract(1, "day").format(), expectedResult: "вчера в 00:00" },
        { date: moment().utc().subtract(1, "day").format(), expectedResult: `вчера в ${moment().utc().format("HH:mm")}` },
        {
            date: moment().utc().startOf("year").add(2, "month").add(14, "day").format(),
            expectedResult: "15 марта в 00:00"
        },
        {
            date: "2017-03-25T16:09:10.609Z",
            expectedResult: "25 марта 2017 года в 16:09"
        },
    ].forEach(({ date, expectedResult }) =>
            it(`should return ${expectedResult} from ${date}`, () => {
            const actual = formatDate(new Date(date));
            assert.equal(actual, expectedResult);
        })
    );
});