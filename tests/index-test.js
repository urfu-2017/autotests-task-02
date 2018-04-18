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
     
            assert.ok(print.calledWith('11 апреля в 15:09' + ': ' + 'Библиотека #nock позволяет не только удобно писать тесты, ' +
            'но и вести разработку фронтеда, в то время, когда бекенд ещё ' +
            'только проектируется! #urfu-testing-2017'));   
            assert.ok(print.calledWith('25 декабря 2016 года в 12:00' + ': ' + 'Для подмены модулей раньше я использовал #mockery, ' +
            'а сейчас всей душой полюбил #proxyquire. #urfu-testing-2017'));           
         });
     });
describe('formatDate', () => { 
    
      describe('positive', () => { 
        it('should return `07:17` for 2018-04-17 07:07', () => { 
            const clock = sinon.useFakeTimers(new Date(2018, 3, 17, 13));
            const actual = formatDate(new Date(2018, 3, 17, 7, 17)); 
            assert.equal(actual, `07:17`); 
            clock.restore();
        }); 
        it('should return `вчера в 20:20` for 2018-04-16 20:00', () => { 
            const clock = sinon.useFakeTimers(new Date(2018, 3, 17));
            const actual = formatDate(new Date(2018, 3, 16, 20)); 
            assert.equal(actual, `вчера в 20:00`); 
            clock.restore();
        }); 
        it('should return `15 апреля в 03:01` for 2018-04-15 03:00', () => {  
            const clock = sinon.useFakeTimers(new Date(2018, 3, 17));
            const actual = formatDate(new Date(2018, 3, 15, 3)); 
            assert.equal(actual, `15 апреля в 03:00`);
            clock.restore(); 
        }); 
        it('should return `01 января 2017 года в 19:00` in 2017-01-01 19:00', () => { 
            const clock = sinon.useFakeTimers(new Date(2018, 3, 17));
            const actual = formatDate(new Date(2017, 0, 1, 19)); 
            assert.equal(actual, `01 января 2017 года в 19:00`); 
            clock.restore();
        }); 
    }); 
    describe('negative', () => { 
        it('should return `Invalid date` for incorrect date', () => { 
            const clock = sinon.useFakeTimers(new Date(2018, 3, 17));
            assert.throws(() => formatDate('201T15:09:10.609Z'), /Invalid date/); 
            clock.restore();
        }); 
        it('should return `Invalid date` for empty date', () => { 
            const clock = sinon.useFakeTimers(new Date(2018, 3, 17));
            assert.throws(() => formatDate(), /Invalid date/); 
            clock.restore();
        }); 
        it('should return `Invalid date` for undefined', () => { 
            const clock = sinon.useFakeTimers(new Date(2018, 3, 17));
            assert.throws(() => formatDate(undefined), /Invalid date/); 
            clock.restore();
        }); it('should return `Invalid date` for NaN', () => { 
            const clock = sinon.useFakeTimers(new Date(2018, 3, 17));
            assert.throws(() => formatDate(NaN), /Invalid date/); 
            clock.restore();
        }); 
        it('should return `Future date` for future data write', () => { 
            const clock = sinon.useFakeTimers(new Date(2018, 3, 17));
            assert.throws(() => formatDate(new Date(2018, 3, 18)), /Future date/);
            clock.restore(); 
        }); 
        
    }); 
});