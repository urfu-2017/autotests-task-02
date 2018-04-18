const proxyquire = require('proxyquire');
const assert = require('assert');
const sinon = require('sinon');
const moment = require('moment');
const format = require('../lib/formatDate');


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
        })
    })


});
