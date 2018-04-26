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

        const [arrayOfArgs] = getTweets.args;
        assert.equal(arrayOfArgs.length, 1);

        const [firstArgument] = arrayOfArgs;

        const posSharpInHashTag = firstArgument.indexOf('#')
        assert.equal(posSharpInHashTag, 0);

        const posSharpInText = firstArgument.slice(1).indexOf('#');
        assert.equal(posSharpInText, -1);
    });
    
    it('should print tweets only once', () => {
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

        const afterFormatTweets = [
            {
                created_at: 0,
                text: ''
            },
            {
                created_at: 0,
                text: ''
            },
            {
                created_at: 0,
                text: ''
            }
        ];
        assert.ok(print.calledWith(afterFormatTweets));
    });
    
    it('should calls formatDate function n times', () => {
        const formatDate = spy();
        
        const showTweets = proxyquire('../lib/index', {
            './getTweets': () => [
                {
                    created_at: 0,
                    text: ''
                },
                {
                    created_at: 0,
                    text: ''
                },
                {
                    created_at: 0,
                    text: ''
                }
            ],
            './formatDate': formatDate,
            './print': () => 0   
        })();

        assert.ok(formatDate.calledThrice);
        assert.ok(formatDate.withArgs(new Date(0)).calledThrice);
    });
    
    it('should return 1 in real time intepretated `main()`', () => {
        const showTweets = proxyquire('../lib/index', {
            './print': () => 1   
        })();
        
        assert.equal(showTweets, 1);
    });
});

