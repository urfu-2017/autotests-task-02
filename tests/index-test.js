const proxyquire = require('proxyquire');
const assert = require('assert');
const sinon = require('sinon');
const formatDate = require('../lib/formatDate');

describe('showTweets', () => {  
    it('should print Конец after tweets', () => {        
        const formatDate = sinon.stub();
        formatDate.withArgs('2018-04-11T15:09:10.609Z').returns('11 апреля в 15:09');
        formatDate.withArgs('2016-12-25T12:00:10.123Z').returns('25 декабря 2016 года в 12:00');
        formatDate.throws('Illegal arguments');
        const print = sinon.spy();
        const showTweets = proxyquire(
            '../lib/index', {
            './formatDate': formatDate,
            './print': print}
        );

        showTweets();

        assert.ok(print.calledWith('11 апреля в 15:09' + '\n' + 'Библиотека #nock позволяет не только удобно писать тесты, ' +
        'но и вести разработку фронтеда, в то время, когда бекенд ещё ' +
        'только проектируется! #urfu-testing-2017'));   
        assert.ok(print.calledWith('25 декабря 2016 года в 12:00' + '\n' + 'Для подмены модулей раньше я использовал #mockery, ' +
        'а сейчас всей душой полюбил #proxyquire. #urfu-testing-2017'));           
    });
});

describe('formatDate', () => {    
    let clock;    
    beforeEach(() => {
        clock = sinon.useFakeTimers(new Date(2018, 3, 17, 16).getTime());      
    });
    afterEach(() => {
        clock.restore();
    }) 
    describe('positive', () => { 
        it('should return `15:15` for todays', () => {
            const anotherDate = new Date(2018, 3, 17, 15, 15);    
            const actual = formatDate(anotherDate.toString());        

            assert.equal(actual, `15:15`);  
        });
        it('should return `вчера в 23:20` for yesterday', () => {
            const anotherDate = new Date(2018, 3, 16, 23, 20);
            const actual = formatDate(anotherDate.toString());        

            assert.equal(actual, `вчера в 23:20`); 
        });
        it('should return `15 апреля в 03:01` for long', () => {
            const anotherDate = new Date(2018, 3, 15, 3, 1);
            const actual = formatDate(anotherDate.toString());        

            assert.equal(actual, `15 апреля в 03:01`);  
        });
        it('should return `01 января 2017 года в 19:59` in last year', () => {
            const anotherDate = new Date(2017, 0, 1, 19, 59);
            const actual = formatDate(anotherDate.toString());        

            assert.equal(actual, `01 января 2017 года в 19:59`);
        });        
    });
    describe('negative', () => {        
        it('should return `Invalid date` for invalid date', () => {     
            assert.throws(() => formatDate('20184-11T15:09:10.609Z'), /Invalid date/);
        });
        it('should return `Future date` for future date', () => {
            const anotherDate = new Date(2018, 3, 17, 18, 15);   
    
            assert.throws(() => formatDate(anotherDate.toString()), /Future date/); 
        });
    });      
});
