const proxyquire = require('proxyquire');
const assert = require('assert');
const sinon = require('sinon');
const showTweets = require('../lib/index');

describe('showTweets', () => {
    const formatDate = sinon.stub();
    // Этот тест написан для примера, его можно удалить
    it('should print `Конец` after tweets', () => {
        const print = sinon.spy();
        const showTweets = proxyquire(
            '../lib/index',
            { './print': print }
        );

        showTweets();

        assert.ok(print.calledWith('Конец'));
    });

    it('should print tweets', () => {
        let date1 = '2018-04-17T22:15:31.609Z';
        let date2 = '2018-04-16T22:15:31.609Z';
       
        formatDate.withArgs(date1).returns('22:15');
        formatDate.withArgs(date2).returns('вчера 22:15');

        const getTweets = sinon.stub();

        getTweets.returns([
            {
                created_at: date1,
                text: 'Тестовые данные'
            },{
                created_at: date2,
                text: 'Тестовые данные 2'
            }
        ]);

        const print = sinon.spy();
        const showTweets = proxyquire('../lib/index', {
            './getTweets' : getTweets,
            './formatDate': formatDate,
            './print' : print
        });
        showTweets();

        assert.ok(print.calledWith('22:15\nТестовые данные\n'));
        assert.ok(print.calledWith('вчера 22:15\nТестовые данные 2\n'));
        assert.ok(print.calledWith('Конец'));
    });

    it ('should print tweet with date', () => {
        formatDate.withArgs('2018-04-17T11:33:15.609Z').returns('Вчера в 11:33');
        formatDate.withArgs('2017-03-18T11:33:10.609Z').returns('18 марта 2017 года в 11:33');
        formatDate.throws('Illegal arguments');
            const showTweets = proxyquire('../lib/index', {
            './formatDate': formatDate
            });
    });
    it ('should throw error when tweet date is in future', () => {
        const print = sinon.spy();
        const showTweets = proxyquire('../lib/index', {
            './print': print,
            "./getTweets": () => [
                { created_at: "3050-03-25T16:09:10.609Z",
                text: "text"
                }]
            });
    });

    describe('Negative tests for dateFormat', () => {
        const negativeCases = [
            {date: null,        expectedMessage: 'date must be a String'},
            {date: undefined,   expectedMessage: 'date must be a String'},
            {date: 1,           expectedMessage: 'date must be a String'},
            {date: 'Date',      expectedMessage: 'date must be a String'},
            {date: 3.3,         expectedMessage: 'date must be a String'},
            {date: NaN,         expectedMessage: 'date must be a String'},
            {date: {},          expectedMessage: 'date must be a String'},
            {date: new Date(),  expectedMessage: 'incorrect format'},
            {date: '2018-04-18L12:00:00.000Z',  expectedMessage: 'incorrect format'},
            {date: '2018-04-55T12:00:00.000Z',  expectedMessage: 'incorrect format'},
        ]
            negativeCases.forEach(function(Cases){
            it (`should trow error "${Cases.expectedMessage}" for "${Cases.date}"`, () => {
                const actual = () => formatDate(Cases.date);
                assert.throws(actual, Cases.expectedMessage);
            })
        })
    });

    describe ('Positive tests for dateFormat', () => {
        const positiveCases = [
            {data: '2018-04-18T16:43:11.609Z', expectedMessage: '18 апреля в 16:43'},
            {data: '2018-04-18T00:00:00.000Z', expectedMessage: '18 апреля в 00:00'},
            {data: '2017-04-18T00:00:00.000Z', expectedMessage: '18 апреля 2017 года в 00:00'},
        ]
    
        positiveCases.forEach(function(Cases){
        it (`should trow error "${Cases.expectedMessage}" for "${Cases.data}" `, () => {
            const actual = () => formatDate(Cases.data);
            assert.throws(actual, Cases.expectedMessage);
        })
        })
    });
});
