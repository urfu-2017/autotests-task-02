const proxyquire = require('proxyquire');
const assert = require('assert');
const sinon = require('sinon');
const showTweets = require('../lib/index');

const tweets = [
    {
        created_at: '2018-04-11T15:09:10.609Z',
        text: 'Сообщение №1'
    },
    {
        created_at: '2016-12-25T12:00:10.123Z',
        text: 'Сообщение №2'
    }
];

describe('showTweets', () => {
    it('should print tweets with new string', () => {
        const print = sinon.spy();
        const formatDate = sinon.stub();
        formatDate.withArgs('2018-04-11T15:09:10.609Z').returns('11 апреля в 15:09');
        formatDate.withArgs('2016-12-25T12:00:10.123Z').returns('25 декабря 2016 года в 12:00');
        formatDate.threw('Illegal arguments');
        const getTweets = sinon.stub();
        getTweets.withArgs('#urfu-testing-2017').returns(tweets);
        getTweets.threw('Illegal arguments');
        const showTweets = proxyquire(
            '../lib/index',
            { './getTweets': getTweets },            
            { './formatDate': formatDate },
            { './print': print}
        );
        const expected = '11 апреля в 15:09\n' + 'Сообщение №1\n' + '25 декабря 2016 года в 12:00\n' +
            'Сообщение №2\n';

        const actual = showTweets();
        
        assert.equal(actual, expected);
    });
});
