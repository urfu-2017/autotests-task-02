const _ = require('lodash')
const moment = require('moment')
const assert = require('assert')
const proxyquire = require('proxyquire')

moment.locale('ru')
moment.suppressDeprecationWarnings = true


const formatDateFrom = (now = null) => (
    proxyquire(
        '../lib/formatDate',
        {
            'moment': {
                'utc': function (date = null) {
                    return moment.utc(date || now || [])
                }
            }
        }
    )
)


describe('formatDate', () => {
    describe('normal cases', () => {
        let examples = [
            {
                'title'  : 'same time on same day',
                'now'    : '2018-04-10T10:00:00.000Z',
                'date'   : '2018-04-10T10:00:00.000Z',
                'expect' : '10:00'
            },
            {
                'title'  : '5 hours ago on same day',
                'now'    : '2018-04-10T10:00:00.000Z',
                'date'   : '2018-04-10T05:00:00.000Z',
                'expect' : '05:00'
            },
            {
                'title'  : '5 hours later on prev day',
                'now'    : '2018-04-10T10:00:00.000Z',
                'date'   : '2018-04-09T15:00:00.000Z',
                'expect' : 'вчера в 15:00'
            },
            {
                'title'  : 'same time on prev day',
                'now'    : '2018-04-10T10:00:00.000Z',
                'date'   : '2018-04-09T10:00:00.000Z',
                'expect' : 'вчера в 10:00'
            },
            {
                'title'  : '5 hours ago on prev day',
                'now'    : '2018-04-10T10:00:00.000Z',
                'date'   : '2018-04-09T05:00:00.000Z',
                'expect' : 'вчера в 05:00'
            },
            {
                'title'  : '5 hours later on past day',
                'now'    : '2018-04-10T10:00:00.000Z',
                'date'   : '2018-04-08T15:00:00.000Z',
                'expect' : '8 апреля в 15:00'
            },
            {
                'title'  : 'same time on past day',
                'now'    : '2018-04-10T10:00:00.000Z',
                'date'   : '2018-04-08T10:00:00.000Z',
                'expect' : '8 апреля в 10:00'
            },
            {
                'title'  : '5 hours ago on past day',
                'now'    : '2018-04-10T10:00:00.000Z',
                'date'   : '2018-04-08T05:00:00.000Z',
                'expect' : '8 апреля в 05:00'
            },
            {
                'title'  : '5 hours later on past year',
                'now'    : '2018-04-10T10:00:00.000Z',
                'date'   : '2017-04-08T15:00:00.000Z',
                'expect' : '8 апреля 2017 года в 15:00'
            },
            {
                'title'  : 'same time on past year',
                'now'    : '2018-04-10T10:00:00.000Z',
                'date'   : '2017-04-08T10:00:00.000Z',
                'expect' : '8 апреля 2017 года в 10:00'
            },
            {
                'title'  : '5 hours ago on past year',
                'now'    : '2018-04-10T10:00:00.000Z',
                'date'   : '2017-04-08T05:00:00.000Z',
                'expect' : '8 апреля 2017 года в 05:00'
            },
            {
                'title'  : 'beginning of same day',
                'now'    : '2018-01-01T00:00:00.000Z',
                'date'   : '2018-01-01T00:00:00.000Z',
                'expect' : '00:00'
            },
            {
                'title'  : 'ending of prev day',
                'now'    : '2018-01-01T00:00:00.000Z',
                'date'   : '2017-12-31T23:00:00.000Z',
                'expect' : 'вчера в 23:00'
            },
            {
                'title'  : 'beginning of prev day',
                'now'    : '2018-01-01T00:00:00.000Z',
                'date'   : '2017-12-31T00:00:00.000Z',
                'expect' : 'вчера в 00:00'
            },
            {
                'title'  : 'ending of past day',
                'now'    : '2018-01-03T00:00:00.000Z',
                'date'   : '2018-01-01T23:00:00.000Z',
                'expect' : '1 января в 23:00'
            },
            {
                'title'  : 'beginning of past day',
                'now'    : '2018-01-03T00:00:00.000Z',
                'date'   : '2018-01-01T00:00:00.000Z',
                'expect' : '1 января в 00:00'
            },
            {
                'title'  : 'ending of past year',
                'now'    : '2018-01-01T00:00:00.000Z',
                'date'   : '2017-12-30T23:00:00.000Z',
                'expect' : '30 декабря 2017 года в 23:00'
            },
            {
                'title'  : 'beginning of past year',
                'now'    : '2018-01-01T00:00:00.000Z',
                'date'   : '2017-01-01T00:00:00.000Z',
                'expect' : '1 января 2017 года в 00:00'
            },
        ]

        _.each(examples, ({ title, now, date, expect }) => {
            it(`should return "${expect}" for ${title}`, () => {
                let actual = formatDateFrom(now)(date)
                assert.equal(actual, expect)
            })
        })
    })

    describe('error cases', () => {
        let examples = [
            {
                'title' : 'invalid date',
                'now'   : null,
                'date'  : '2018-13-35T10:00:00.000Z',
                'error' : /Date must be valid/
            },
            {
                'title' : 'invalid date format',
                'now'   : null,
                'date'  : 'it is not even date',
                'error' : /Date must be valid/
            },
            {
                'title' : 'date from future',
                'now'   : '2018-04-10T10:00:00.000Z',
                'date'  : '2018-04-11T10:00:00.000Z',
                'error' : /Date must be from the past/
            },
        ]

        _.each(examples, ({ title, now, date, error }) => {
            it(`should throw ${error} for ${title}`, () => {
                let actual = _.partial(formatDateFrom(now), date)
                assert.throws(actual, error)
            })
        })
    })
})
