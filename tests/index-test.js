const proxyquire = require('proxyquire');
const assert = require('assert');
const sinon = require('sinon');
const moment = require('moment');
const format = require('../lib/formatDate');
const showTweets = require('../lib/index');


describe('checkFormatDate', () => {
    describe('positive', ()=>{
        [
            {
                date: '2018-04-12T15:09:10.609Z',
                expected: '12 апреля в 15:09'
            },
            {
                date: '2016-12-25T12:00:10.123Z',
                expected: '25 декабря 2016 года в 12:00'
            },
            {
                date: moment().utc(),
                expected: `${moment().utc().format('HH:mm')}`
            },
            {
                date: moment().utc().subtract(1, 'd'),
                expected: `вчера в ${moment().utc().format('HH:mm')}`
            }
        ].forEach(({date, expected}) => {
            it(`should return '${expected}' for ${date}`, () => {
                assert.equal(format(date), expected)
            });
        });
    });

    describe('negative', ()=>{
        [
            {
                date: 'jhbuh',
                expected: /invalid date/
            },
            {
                date: null,
                expected: /invalid date/
            },
            {
                date: undefined,
                expected: /invalid date/
            },
            {
                date: moment().utc().add(5, 'd'),
                expected: /future date/
            }
        ].forEach(({date, expected}) => {
            it(`should throw ${expected} for ${date}`,()=>{
                assert.throws(()=>format(date),expected)
            });
        });
    });
});

describe('check showTweets', () => {
    it('should print tweats',()=>{
        const print = sinon.stub();
        print.onCall(0).returns();
        
        const formatDate = sinon.stub();
        formatDate.withArgs('2018-04-11T15:09:10.609Z').returns('11 апреля в 15:09');
        formatDate.withArgs('2016-12-25T12:00:10.123Z').returns('25 декабря 2016 года в 12:00');
        formatDate.throws('Illegal arguments');

        const showTweets = proxyquire('../lib/index', {
            './formatDate': formatDate,
            './print': print
        });
        const expected = '11 апреля в 15:09\n'+
        'Библиотека #nock позволяет не только удобно писать тесты, но и вести разработку фронтеда, в то время,'+
        ' когда бекенд ещё только проектируется! #urfu-testing-2017\n\n'+
        '25 декабря 2016 года в 12:00\n'+
        'Для подмены модулей раньше я использовал #mockery, а сейчас всей душой полюбил #proxyquire. #urfu-testing-2017\n\n'

        assert.equal(showTweets(), expected)
    
    })
});