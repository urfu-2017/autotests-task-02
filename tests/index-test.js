const proxyquire = require('proxyquire');
const assert = require('assert');
const sinon = require('sinon');
const formatDate = require('../lib/formatDate');
const moment = require('moment');

describe("formatDate", () => {
    [
        { date: "", error: "Date is not valid" },
        { date: "1994-13-31T00:00:00.000Z", error: "Date is not valid" },
        { date: "9999-12-31T00:00:00.000Z", error: "Tweet from future"}
    ].forEach(({ date, error }) =>
            it(`should throw "${error}" for "${date}"`, () => {
            assert.throws(() => formatDate(new Date(date)), error);
        }));

    [
        { date: moment().utc().startOf("day").format(), expectedResult: "00:00" },
        { date: moment().utc().startOf("day").add(5, "minute").format(), expectedResult: "00:05" },
        { date: moment().utc().startOf("day").subtract(1, "day").format(), expectedResult: "вчера в 00:00" },
        { date: moment().utc().startOf("year").add(2, "month").format(), expectedResult: "1 марта в 00:00" },
        { date: moment().utc().startOf("year").subtract(1, "day").format(), expectedResult: "31 декабря 2017 года в 00:00" },
        { date: "2016-12-25T12:00:10.123Z", expectedResult: "25 декабря 2016 года в 12:00" },
    ].forEach(({ date, expectedResult }) =>
            it(`should return ${expectedResult} from ${date}`, () => {
            const actual = formatDate(new Date(date));
            assert.equal(actual, expectedResult);
        })
    );
});