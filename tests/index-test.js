const proxyquire = require('proxyquire');
const assert = require('assert');
const sinon = require('sinon');
 
describe('showTweets', () => {
    it('should print call counts 4 ', () => {
        const print = sinon.spy();
        const showTweets = proxyquire(
            '../lib/index',
            { './print': print }
        );

        showTweets();

        assert.equal(print.callCount, 4);
    });
});

