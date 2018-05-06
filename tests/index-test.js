const proxyquire = require('proxyquire')
const assert = require('assert')
const sinon = require('sinon')


const cases = [
    {
        tweets: 
        [
        ],
        expected: ""
    },
    {
        tweets: 
        [
            { created_at: "home", text: "Tweet" },
            { created_at: "home", text: "Tweet" }
        ],
        expected: "home\nTweet\n\nhome\nTweet"
    }
    
]


function MockedIndex(tweets) {
    this.print = sinon.spy()
    this.formatDate = date => date
    this.getTweets = () => tweets
    this.index = proxyquire(
        '../lib/index',
        { 
            './print': this.print, 
            './formatDate': this.formatDate,
            './getTweets': this.getTweets
        }
    )
}


describe('index tests', () => {

    describe('showTweets', () => {
        cases.forEach(({tweets, expected}) => {
            it(`should print ${tweets.length} tweets formatted`, () => {
                const { index, print } = new MockedIndex(tweets)

                index.showTweets()
                assert(print.calledWith(expected))
            })
        })
    })

    describe('showTweetsTicker', () => {

        let clock
        
        before(function () { clock = sinon.useFakeTimers() })
        after(function () { clock.restore() })   
        
        cases.forEach(({tweets, expected}) => {

            it('should print one letter every 100ms', () => {
                const { index, print } = new MockedIndex(tweets)

                index.showTweetsTicker()

                let expectedCallCount = 0

                while (expectedCallCount != expected.length) {
                    clock.tick(99)
                    assert.equal(print.callCount, expectedCallCount)

                    clock.tick(1)
                    expectedCallCount += 1
                    let actualCallCount = print.callCount
                    let callIndex = actualCallCount - 1

                    assert.equal(actualCallCount, expectedCallCount)
                }
            })

            it('should print one right letter every time', () => {
                const { index, print } = new MockedIndex(tweets)

                index.showTweetsTicker()

                let expectedCallCount = 0

                while (expectedCallCount != expected.length) {
                    clock.tick(99)

                    clock.tick(1)
                    expectedCallCount += 1
                    let actualCallCount = print.callCount
                    let callIndex = actualCallCount - 1

                    let spyCallArg = print.getCall(callIndex).args[0]

                    assert.equal(spyCallArg, expected.charAt(callIndex))
                }
            })
        })
    })


    const formatDate = require('../lib/formatDate.js')

    describe('formatDate', () => {

        let clock = null

        const ifTodayIs = time => { return {
            itShouldFormate: example => { return {
                as: expected => {
                    it(`it should return '${expected}' for '${example}'`, () => {
                        clock = sinon.useFakeTimers(time)
                        const actual = formatDate(example)
                        assert.strictEqual(actual, expected)
                    })
                }
            }},
            ifShouldThrow: errorFilter => { return {
                whenFormatting: example => {
                    it(`it should throw ${errorFilter} for '${example}'`, () => {
                        clock = sinon.useFakeTimers(time)
                        const func = () => formatDate(example)
                        assert.throws(func, errorFilter)
                    })
                }
            }}
        }}


        afterEach(() => {
            if (clock) 
                clock.restore()
        })


        const adventureTime = new Date('2018-04-11T16:20:00.609Z')

        describe('common usage', () => {
            ifTodayIs(adventureTime).itShouldFormate('2018-04-11T15:09:10.609Z').as('в 15:09')
            ifTodayIs(adventureTime).itShouldFormate('2018-04-10T15:09:10.609Z').as('вчера в 15:09')
            ifTodayIs(adventureTime).itShouldFormate('2018-03-25T15:09:10.609Z').as('25 марта в 15:09')
            ifTodayIs(adventureTime).itShouldFormate('2017-03-25T15:09:10.609Z').as('25 марта 2017 года в 15:09')
        })

        const firstOfMartch = new Date('2018-03-01T16:20:00.609Z')
        const firstOfMartchLeapYear = new Date('2016-03-01T16:20:00.609Z')

        describe('feb->mar leap year issuses', () => {
            ifTodayIs(firstOfMartch).itShouldFormate('2018-02-28T13:37:00.609Z').as('вчера в 13:37')
            ifTodayIs(firstOfMartchLeapYear).itShouldFormate('2016-02-29T13:37:00.609Z').as('вчера в 13:37')
            ifTodayIs(firstOfMartchLeapYear).itShouldFormate('2016-02-28T13:37:00.609Z').as('28 февраля в 13:37')
        })

        const bicycleDay = new Date('1943-04-19T16:20:00.609Z')

        describe('years before 1970', () => {
            ifTodayIs(bicycleDay).itShouldFormate('1943-04-18T16:19:00.609Z').as('вчера в 16:19')
        })

        describe('Word `вчера` is correctly displayed', () => {
            ifTodayIs(bicycleDay).itShouldFormate('1943-04-19T00:00:00.609Z').as('в 00:00')
            ifTodayIs(bicycleDay).itShouldFormate('1943-04-18T23:59:00.609Z').as('вчера в 23:59')
            ifTodayIs(bicycleDay).itShouldFormate('1943-04-18T00:00:00.609Z').as('вчера в 00:00')
            ifTodayIs(bicycleDay).itShouldFormate('1943-04-17T23:59:00.609Z').as('17 апреля в 23:59')
        })

        const deadline = new Date('2018-04-18T19:30:00.609Z')
        const firstOfJan = new Date('2018-01-01T00:00:00.609Z')    

        describe('years ago', () => {
            ifTodayIs(deadline).itShouldFormate('1943-04-19T16:20:00.609Z').as('19 апреля 1943 года в 16:20')
            ifTodayIs(deadline).itShouldFormate('2017-04-18T19:30:00.609Z').as('18 апреля 2017 года в 19:30')
            ifTodayIs(firstOfJan).itShouldFormate('2017-12-31T23:59:00.609Z').as('вчера в 2017 году в 23:59')
        })

        describe('negative', () => {
            ifTodayIs(bicycleDay).ifShouldThrow(/Parsing error/).whenFormatting('PINK SIX HANDED ELEPHANT')
            ifTodayIs(bicycleDay).ifShouldThrow(/Future formatting/).whenFormatting('2018-04-18T19:30:00.609Z')
        })

    })
})