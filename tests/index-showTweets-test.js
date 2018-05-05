const proxyquire = require('proxyquire');
const assert = require('assert');
const sinon = require('sinon');

describe('showTweets', () => {
    it('should print date and tweet', () => {
        const formatDate = sinon.stub();
        const print = sinon.spy();
        formatDate.withArgs('2018-04-11T15:09:10.609Z').returns('вчера в 15:09');
        formatDate.withArgs('2016-12-25T12:00:10.123Z').returns('25 марта 2016 года в 15:09');
        formatDate.throws('Illegal arguments');

        const showTweets = proxyquire('../lib/index', {
            './formatDate': formatDate,
            './print': print,
        });
        showTweets();

        var correct = "вчера в 15:09\n" +
            "Библиотека #nock позволяет не только удобно писать тесты, но и вести разработку фронтеда, в то время, когда бекенд ещё только проектируется! #urfu-testing-2017\n\n" +
            "25 марта 2016 года в 15:09\n" +
            "Для подмены модулей раньше я использовал #mockery, а сейчас всей душой полюбил #proxyquire. #urfu-testing-2017\n\n";
        assert.ok(print.calledOnce);
        assert.ok(print.calledWith(correct));
        });
});