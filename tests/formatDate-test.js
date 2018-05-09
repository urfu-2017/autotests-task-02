const proxyquire = require('proxyquire');
const assert = require('assert');
const sinon = require('sinon');
const formatDate = require('formatDate');

describe('showTweets', () => {
    it('should format today date properly', () => {
        const actual = formatDate('2018-05-09T05:09:10.609Z');
        assert.equal(actual,'05:09');
    });

    it('should format today midnight date properly', () => {
        const actual = formatDate('2018-05-09T00:00:00.000Z');
        assert.equal(actual,'00:00');
    });

    it('should format yesterday date properly', () => {
        const actual = formatDate('2018-05-08T05:09:10.609Z');
        assert.equal(actual,'Вчера в 05:09');
    });

    it('should format this year date properly', () => {
        const actual = formatDate('2018-03-09T05:09:10.609Z');
        assert.equal(actual,'3 марта в 05:09');
    });

    it('should format previous years tweets properly', () => {
        const actual = formatDate('2017-05-09T05:09:10.609Z');
        assert.equal(actual,'9 мая 2017 года в 05:09');
    });

    it('should throw error with wrong data', () => {       
        try {
                const actual = formatDate('2100-01-01T00:00:00.000Z');
                throw new Error('`showTweets` should throw error');
            } catch (error) {
                assert.equal(error.message, 'Wrong data format');
            }
        });

    it('should throw error with wrong data', () => {
        try {
            const actual = formatDate('This is not a date');
            throw new Error('`showTweets` should throw error');
        } catch (error) {
            assert.equal(error.message, 'Wrong data format');
        }
        });
    })
