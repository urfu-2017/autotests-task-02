const proxyquire = require('proxyquire');
const assert = require('assert');
const sinon = require('sinon');

describe('showTweets', () => {
    // Этот тест написан для примера, его можно удалить
    it('should print `Конец` after tweets', () => {
        const print = sinon.spy();
        const showTweets = proxyquire(
            '../lib/index',
            { '../lib/print': print }
        );

        showTweets();

        assert.ok(print.calledOnce);
        assert.ok(print.calledWith('Конец'));
    });
});
describe('formatDate', () => {
    it('should return 15:09', () => {
           const formatDate = sinon.spy({formatDate:require('../lib/formatDate')},'formatDate');
                var test1 = new Date('2018-04-18T15:09:10.609Z')

                assert.equal('15:09', formatDate(test1));
        });
    it('should return 11 Апреля 2015 года в 15:09', () => {
        const formatDate = sinon.spy({formatDate:require('../lib/formatDate')},'formatDate');
        var test1 = new Date('2015-04-11T15:09:10.609Z')

        assert.equal('11 Апреля 2015 года в 15:09', formatDate(test1));
    });
    it('should return вчера в 15:09', () => {
        const formatDate = sinon.spy({formatDate:require('../lib/formatDate')},'formatDate');
        var test1 = new Date('2018-04-17T15:09:10.609Z')

        assert.equal('вчера в 15:09', formatDate(test1));
    });
    it('should return 17 Марта в 15:09', () => {
        const formatDate = sinon.spy({formatDate:require('../lib/formatDate')},'formatDate');
        var test1 = new Date('2018-03-17T15:09:10.609Z')

        assert.equal('17 Марта в 15:09', formatDate(test1));
    });
});