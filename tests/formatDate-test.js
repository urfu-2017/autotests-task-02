const proxyquire = require('proxyquire');
const assert = require('assert');

describe('formatDate', () => {
    it(`should return time without prefix for today time`, () => {        
        const formatDate = proxyquire('../lib/formatDate', {
            './getTime': () => '15:19'
        });
        
        const checkDate = new Date();
        const actual = formatDate(checkDate);

        assert.equal(actual, '15:19');
    });
    
    it(`should return time with 'вчера' prefix for yesterday time`, () => {
        const formatDate = proxyquire('../lib/formatDate', {
            './getTime': () => '15:19'
        });
        
        const checkDate = new Date(Date.now() - 1000 * 60 * 60 * 24);
        const actual = formatDate(checkDate);
        
        assert.equal(actual, 'вчера в 15:19');
    });
    
    it('should return time with `день месяц` prefix ' + 
       'for early then yesterday time', () => {
        const formatDate = proxyquire('../lib/formatDate', {
            './getTime': () => '15:19'
        });
        
        const checkDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 2); 
        const actual = formatDate(checkDate);
        
        assert.equal(actual.split(' ').length, 4);
    });
    
    it('should return time with `день месяц год` prefix ' +
        'for early then this year time', () => {
        const formatDate = proxyquire('../lib/formatDate', {
            './getTime': () => '15:19'
        });
        
        const checkDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 365);
        const actual = formatDate(checkDate);
        
        assert.equal(actual.split(' ').length, 6);
        assert.equal(actual.split(' ')[2].length, 4);
    });
    
    it('should return time with `день месяц год` prefix ' + 
        'for yesterday time, but in previous year', () => {
        const formatDate = proxyquire('../lib/formatDate', {
            './getTime': () => '15:19',
            'nowDate': new Date(2018, 0, 1, 21)
        });
    
        const checkDate = new Date(2017, 11, 31, 21);
        const fakeNowDate = new Date(2018, 0, 1, 21);
        const actual = formatDate(checkDate, fakeNowDate);
        
        assert.equal(actual.split(' ').length, 6);
        assert.equal(actual.split(' ')[2].length, 4);
    });
});
