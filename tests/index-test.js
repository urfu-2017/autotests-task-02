const proxyquire = require('proxyquire');
// const showTweets = require('../lib/index');
const assert = require('assert');
const sinon = require('sinon');

function runTest(string){
    return () => {
        const formatDate = sinon.stub();
        const print = sinon.spy();

        formatDate.withArgs('2018-04-11T15:09:10.609Z').returns('15:09');
        formatDate.withArgs('2016-12-25T12:00:10.123Z').returns('25 декабря 2016 года в 12:00');
        const showTweets = proxyquire('../lib/index', {
            '../lib/formatDate': formatDate,
            './print': print
        });

        showTweets();

        assert.ok(print.calledWith(string));
    }
}

describe('showTweets', () => {
    it('should print first tweet', () => {
        runTest('15:09' + '\n' + 'Библиотека #nock позволяет не только удобно писать тесты,' +
            'но и вести разработку фронтеда, в то время, когда бекенд ещё только проектируется!' +
            '#urfu-testing-2017' + '\n')
    });
    it('should print second tweet', () => {
        runTest('25 декабря 2016 года в 12:00' + '\n' + 'Для подмены модулей раньше я использовал #mockery, ' +
            'а сейчас всей душой полюбил #proxyquire. #urfu-testing-2017' + '\n')
    });
});
