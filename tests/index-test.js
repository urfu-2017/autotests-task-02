const proxyquire = require('proxyquire');
const assert = require('assert');
const sinon = require('sinon');

describe('showTweets', () => {
    // Этот тест написан для примера, его можно удалить
    it('should print tweets properly', () => {
        const formatDate = sinon.stub();
        formatDate.withArgs('2018-04-17T15:09:10.609Z').returns('15:09');
        formatDate.throws('illegal arguments');
        const getTweets = sinon.stub();
        getTweets.returns([{
            created_at: '2018-04-17T15:09:10.609Z',
            text: 'Тестировщик заходит в бар'
        }]); 
        const print = sinon.spy();
        const showTweets = proxyquire('../lib/index', {
            './formatDate': formatDate,
            './getTweets' : getTweets,
            './print' : print
        });
        showTweets();

        assert.ok(print.calledWith('15:09'));
        
        assert.ok(print.calledWith('Тестировщик заходит в бар'));
    });

    it('should format today tweets properly', () => {
        const getTweets = sinon.stub();
        getTweets.returns([{
            created_at: '2018-04-17T05:09:10.609Z',
            text: 'Тестировщик забегает в бар'
        }]); 
        const print = sinon.spy();
        const showTweets = proxyquire('../lib/index', {
            './getTweets' : getTweets,
            './print' : print
        });
        showTweets();

        assert.ok(print.calledWith('05:09'));
        
        assert.ok(print.calledWith('Тестировщик забегает в бар'));
    });

    it('should format today midnight tweets properly', () => {
        const getTweets = sinon.stub();
        getTweets.returns([{
            created_at: '2018-04-17T00:00:00.000Z',
            text: 'Тестировщик заползает в бар'
        }]); 
        const print = sinon.spy();
        const showTweets = proxyquire('../lib/index', {
            './getTweets' : getTweets,
            './print' : print
        });
        showTweets();

        assert.ok(print.calledWith('00:00'));
        
        assert.ok(print.calledWith('Тестировщик заползает в бар'));
    });

    it('should format yesterday tweets properly', () => {
        const getTweets = sinon.stub();
        getTweets.returns([{
            created_at: '2018-04-16T00:00:00.000Z',
            text: 'Тестировщик залетает в бар'
        }]); 
        const print = sinon.spy();
        const showTweets = proxyquire('../lib/index', {
            './getTweets' : getTweets,
            './print' : print
        });
        showTweets();

        assert.ok(print.calledWith('Вчера в 00:00'));
        
        assert.ok(print.calledWith('Тестировщик залетает в бар'));
    });

    it('should format this year tweets properly', () => {
        const getTweets = sinon.stub();
        getTweets.returns([{
            created_at: '2018-01-01T00:00:00.000Z',
            text: 'Тестировщик заезжает в бар на санях'
        }]); 
        const print = sinon.spy();
        const showTweets = proxyquire('../lib/index', {
            './getTweets' : getTweets,
            './print' : print
        });
        showTweets();

        assert.ok(print.calledWith('1 января в 00:00'));
        
        assert.ok(print.calledWith('Тестировщик заезжает в бар на санях'));
    });

    it('should format previous years tweets properly', () => {
        const getTweets = sinon.stub();
        getTweets.returns([{
            created_at: '1812-01-01T00:00:00.000Z',
            text: 'Тестировщикъ захаживает в трактиръ'
        }]); 
        const print = sinon.spy();
        const showTweets = proxyquire('../lib/index', {
            './getTweets' : getTweets,
            './print' : print
        });
        showTweets();

        assert.ok(print.calledWith('1 января 1812 года в 00:00'));
        
        assert.ok(print.calledWith('Тестировщикъ захаживает в трактиръ'));
    });

    it('should throw error with wrong data', () => {
        const getTweets = sinon.stub();
        getTweets.returns([{
            created_at: '2100-01-01T00:00:00.000Z',
            text: 'Андроид-тестировщик подключается к облачному бару'
        }]); 
        const print = sinon.spy();
        const showTweets = proxyquire('../lib/index', {
            './getTweets' : getTweets,
            './print' : print
        });        
        try {
                showTweets();
                throw new Error('`showTweets` should throw error')
            } catch (error) {
                assert.equal(error.message, 'Wrong data format');
            }
        });

    it('should throw error with wrong data', () => {
        const getTweets = sinon.stub();
        getTweets.returns([{
            created_at: 'No time indeed',
            text: 'Вневременной тестировщик всегда был в баре'
        }]); 
        const print = sinon.spy();
        const showTweets = proxyquire('../lib/index', {
            './getTweets' : getTweets,
            './print' : print
        });        
        try {
                showTweets();
                throw new Error('`showTweets` should throw error')
            } catch (error) {
                assert.equal(error.message, 'Wrong data format');
            }
        });
});
