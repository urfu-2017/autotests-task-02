const proxyquire = require('proxyquire');
const assert = require('assert');
const sinon = require('sinon');

describe('showTweets', () => {
    // Этот тест написан для примера, его можно удалить
    it('should print `Конец` after tweets', () => {
        const print = sinon.spy();
        const showTweets = proxyquire(
            '../lib/index',
            { './print': print }
        );

        showTweets();

        assert.ok(print.calledOnce);
        assert.ok(print.calledWith('Конец'));
    });
});
