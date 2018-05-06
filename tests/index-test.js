const proxyquire = require('proxyquire');
const assert = require('assert');
const sinon = require('sinon');
 
describe('showTweets', () => {
    it('should call print for formatted date, then for text', () => {
        const print = sinon.spy();
        const showTweets = proxyquire(
            '../lib/index',
            {
                './print': print,
                './getTweets': () => [{ created_at: 'date1', text: 'text' }],
                './formatDate': () => 'formattedDate'
            }
        );

        showTweets();

        sinon.assert.calledWith(print, 'formattedDate');
        sinon.assert.calledWith(print, 'text');
    });
});
