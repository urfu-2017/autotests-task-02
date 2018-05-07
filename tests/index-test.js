'use strict';

const assert = require('assert');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const tk = require('timekeeper');

describe('showTweets', () => {
    it('should return empty string if there no tweets', () => {
        const print = sinon.spy();
        const lib = proxyquire('../lib/index', {
            './print': print,
            './getTweets': () => []
        });

        lib.showTweets();

        assert.ok(print.calledOnce);
        sinon.assert.calledWith(print, sinon.match(''));
    });

    it('should print in format "(<tweet.created_at>\\n<tweet.text>\\n)+"', () => {
        const print = sinon.spy();
        const lib = proxyquire('../lib/index', {
            './print': print,
            './formatDate': date => date,
            './getTweets': () => [
                {
                    created_at: 'date-1',
                    text: 'text-1'
                },
                {
                    created_at: 'date-2',
                    text: 'text-2'
                },
                {
                    created_at: 'date-3',
                    text: 'text-3'
                }
            ]
        });

        lib.showTweets();

        assert.ok(print.calledOnce);
        sinon.assert.calledWith(print, sinon.match(
            'date-1\ntext-1\n\ndate-2\ntext-2\n\ndate-3\ntext-3'
        ));
    });
});

describe('showRunningLine', () => {
    const now = new Date('2018.04.12 12:42:08.232').getTime();

    beforeEach(() => {
        sinon.spy(process.stdout, 'write');
        tk.freeze(now);
    });

    it('should print letters one by one', done => {
        const lib = proxyquire('../lib/index', {
            './formatDate': date => date,
            './getTweets': () => [
                {
                    created_at: 'date-1',
                    text: 'text-1'
                },
                {
                    created_at: 'date-2',
                    text: 'text-2'
                },
                {
                    created_at: 'date-3',
                    text: 'text-3'
                }
            ]
        });

        lib.showRunningLine(() => {
            assert.equal(process.stdout.write.callCount, 43);
            done();
        });

        tk.travel(now + 1000);
    });

    afterEach(() => {
        process.stdout.write.restore();
        tk.reset();
    });
});
