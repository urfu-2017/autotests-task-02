const proxyquire = require('proxyquire');
const assert = require('assert');

describe('formatDate', () => {
    beforeEach(() => {
        formatDate = proxyquire('../lib/formatDate', {
            './getTime': () => '15:19',
        });
    });

    it(`should return time without prefix for today time`, () => {
        const checkDate = new Date();
        const actual = formatDate(checkDate);

        assert.equal(actual, '15:19');
    });
    
    it('should return time with \'вчера\' prefix for yesterday time', () => {
        const checkDate = new Date(Date.now() - 1000 * 60 * 60 * 24);
        const actual = formatDate(checkDate);
        
        assert.equal(actual, 'вчера в 15:19');
    });
    
    it('should return time with `день месяц` prefix ' + 
       'for early then yesterday time', () => {
        const checkDate = new Date(2018, 2, 15, 21);
        const fakeNowDate = new Date(2018, 3, 12, 21);
        const actual = formatDate(checkDate, fakeNowDate);
        
        assert.equal(actual, `15 марта в 15:19`);
    });
    
    it('should return time with `день месяц год` prefix ' +
        'for early then this year time', () => {
        const checkDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 365);
        const actual = formatDate(checkDate);
        
        assert.equal(actual.split(' ').length, 6);
        assert.equal(actual.split(' ')[2].length, 4);
    });
    
    it('should return time with `вчера` prefix ' + 
        'for yesterday time, but in previous year', () => {
        const checkDate = new Date(2017, 11, 31, 21);
        const fakeNowDate = new Date(2018, 0, 1, 21);
        const actual = formatDate(checkDate, fakeNowDate);
        
        assert.equal(actual, 'вчера в 15:19');
    });
    
    it('should return time with \'вчера\' prefix ' + 
        'for yesterday time, but in previous month', () => {
        const checkDate = new Date(2018, 2, 31, 21);
        const fakeNowDate = new Date(2018, 3, 1, 21);
        const actual = formatDate(checkDate, fakeNowDate);
        
        assert.equal(actual, 'вчера в 15:19');
    });
});
