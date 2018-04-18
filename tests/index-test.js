const proxyquire = require('proxyquire');
const assert = require('assert');
const sinon = require('sinon');
const mockery = require('proxyquire');

describe('index', () => {
    describe('positiv',() => {
        it('should print tweet1', () => {        
            const formatDate = sinon.stub();
            formatDate.withArgs('2018-04-11T15:09:10.609Z').returns('11 апреля в 15:09');
            const print = sinon.spy();
            const index = proxyquire(
                '../lib/index', {
                './formatDate': formatDate,
                './print': print}
            );
            index(); 
            assert.ok(print.calledWith('11 апреля в 15:09' + '\n' + 'Библиотека #nock позволяет не только удобно писать тесты, ' +
            'но и вести разработку фронтеда, в то время, когда бекенд ещё ' +
            'только проектируется! #urfu-testing-2017'));          
        });
        it('should print tweet2', () => {        
            const formatDate = sinon.stub();
            formatDate.withArgs('2016-12-25T12:00:10.123Z').returns('25 декабря 2016 года в 12:00');         
            const print = sinon.spy();
            const index = proxyquire(
                '../lib/index', {
                './formatDate': formatDate,
                './print': print}
            );
            index();  
            assert.ok(print.calledWith('25 декабря 2016 года в 12:00' + '\n' + 'Для подмены модулей раньше я использовал #mockery, ' +
            'а сейчас всей душой полюбил #proxyquire. #urfu-testing-2017'));           
        });
    });
});

const formatDate = require('../lib/formatDate');
describe('getDate', () => {
    describe('positiv',() => {
        it('should return `25 марта в 15:09` for 2018-03-25T15:09:10.609Z', () => {
            const actual = formatDate('2018-03-25T15:09:10.609Z');
    
            assert.equal(actual, '25 марта в 15:09');
        });
        it('should return `15:09` for 2018-04-18T15:09:10.609Z', () => {
            const actual = formatDate('2018-04-18T15:09:10.609Z');
    
            assert.equal(actual, '15:09');
        });
        it('should return `вчера в 15:09` for 2018-04-17T15:09:10.609Z', () => {
            const actual = formatDate('2018-04-17T15:09:10.609Z');
    
            assert.equal(actual, 'вчера в 15:09');
        });
        it('should return `25 марта 2017 года в 15:09` for 2017-03-25T15:09:10.609Z', () => {
            const actual = formatDate('2017-03-25T15:09:10.609Z');
    
            assert.equal(actual, '25 марта 2017 года в 15:09');
        });
    });
    describe('negativ',() => {
        it('throw `Erroe with type of date`', () => {    

            assert.throws(() => formatDate(''), /Erroe with type of date/);
        });
        it('throw `Error with date, day = 32 month = 03 year = 2017', () => {    

            assert.throws(() => formatDate('2017-03-32T15:09:10.609Z'), /Error with date, day = 32 month = 3 year = 2017/);
        });
        it('throw `Error with date, day = 17 month = 13 year = 2017', () => {    

            assert.throws(() => formatDate('2017-13-17T15:09:10.609Z'), /Error with date, day = 17 month = 13 year = 2017/);
        });
        it('throw `Twit from the future Day = 23/`', () => {    

            assert.throws(() => formatDate('2018-04-23T15:09:10.609Z'), /Twit from the future Day = 23/);
        });
        it('throw `Twit from the future Year = 2019`', () => {    

            assert.throws(() => formatDate('2019-04-11T15:09:10.609Z'), /Twit from the future Year = 2019/);
        });
        it('throw `Twit from the future Month = 6`', () => {    

            assert.throws(() => formatDate('2018-06-11T15:09:10.609Z'), /Twit from the future Month = 6/);
        });
    });
});