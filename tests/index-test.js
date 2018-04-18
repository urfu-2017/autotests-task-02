const proxyquire = require('proxyquire');
const assert = require('assert');
const sinon = require('sinon');

describe('showTweets1', () => {
    it('should print `Конец` after tweets', () => {
        const print = sinon.spy(); 
        const showTweets = proxyquire(
            '../lib/index',
            { './print': print }
        );

        showTweets();

        // assert.ok(print.calledOnce);
        assert.ok(print.calledWith('Конец'));
    });
});

describe('showTweets2', () => {
    it('should print `Для подмены модулей`', () => {
        const print = sinon.spy(); 
        const showTweets = proxyquire(
            '../lib/index',
            { './print': print }
        );

        showTweets();

        assert.ok(print.calledWith('Для подмены модулей раньше я использовал #mockery, а сейчас всей душой полюбил #proxyquire. #urfu-testing-2017'));
    });
});

describe('formatDate1', () => {
    it('should return `05:00`', () => {  
        const formatDate = sinon.spy({formatDate:require('../lib/formatDate')},'formatDate');
        
        const f = formatDate("2018-04-18T05:00:10.609Z");

        assert.equal('05:00', f);
    });
});

describe('formatDate2', () => {
    it('should return `вчера в 14:23`', () => {  
        const formatDate = sinon.spy({formatDate:require('../lib/formatDate')},'formatDate');
        
        const f = formatDate("2018-04-17T14:23:10.609Z");

        assert.equal('вчера в 14:23', f);
    });
});

describe('formatDate3', () => {
    it('should return `19 января в 18:00`', () => {  
        const formatDate = sinon.spy({formatDate:require('../lib/formatDate')},'formatDate');
        
        const f = formatDate("2018-01-19T18:00:10.609Z");

        assert.equal('19 января в 18:00', f);
    });
});

describe('formatDate4', () => {
    it('should return `3 марта 2010 года в 15:20`', () => {  
        const formatDate = sinon.spy({formatDate:require('../lib/formatDate')},'formatDate');
        
        const f = formatDate("2010-03-03T15:20:10.609Z");

        assert.equal('3 марта 2010 года в 15:20', f);
    });
});


