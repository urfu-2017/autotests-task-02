const { spy } = require('sinon');
const assert = require('assert');
const proxyquire = require('proxyquire');

describe('showTweets', () => {
    it('should calls getTweets function once', () => {
        const getTweets = spy();        
        
        const tweets = proxyquire('../lib/index', {
            './getTweets': getTweets,
            './formatDate': () => 0,
            './print': () => 0
        })
        tweets();

        assert.ok(getTweets.calledOnce);
    });
    
    it('should print tweets n times', () => {
        const print = spy();
        
        const showTweets = proxyquire('../lib/index', {
            './getTweets': () => [
                {
                    created_at: '',
                    text: ''
                },
                {
                    created_at: '',
                    text: ''
                },
                {
                    created_at: '',
                    text: ''
                }
            ],
            './formatDate': () => 0,
            './print': print
        })();
        
        assert.ok(print.calledOnce);
    });
    
    it('should calls formatDate function n times', () => {
        const formatDate = spy();
        
        const showTweets = proxyquire('../lib/index', {
            './getTweets': () => [
                {
                    created_at: '',
                    text: ''
                },
                {
                    created_at: '',
                    text: ''
                },
                {
                    created_at: '',
                    text: ''
                }
            ],
            './formatDate': formatDate,
            './print': () => 0   
        })();
        
        assert.equal(formatDate.callCount, 3);
    });
});

