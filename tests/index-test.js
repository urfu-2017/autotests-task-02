const proxyquire = require('proxyquire');
const assert = require('assert');
const sinon = require('sinon');
const formatDate = require('../lib/formatDate');
const showTweets = require('../lib/index');


//describe('showTweets', () => {
    /* Этот тест написан для примера, его можно удалить
    it('should print `Конец` after tweets', () => {
        const print = sinon.spy();
        const showTweets = proxyquire(
            '../lib/index',
            { './print': print }
        );

        showTweets();
        assert.ok(print.calledOnce);
        assert.ok(print.calledWith('Конец'));
    });*/

//Тест формата даты
function runSuccessTest(date, expected){
    return () => {
        const actual = formatDate(date); assert.equal(actual, expected);
    }
}
    describe('formatDate', () => {


        it('should throw new Error \'Incorrect day\' for date \'2018-04-44T15:09:10.609Z\'', () => {
            const actual= () => formatDate('2018-04-44T15:09:10.609Z');
            assert.throws(actual, /Incorrect day/);
        });
        it('should throw new Error \'Incorrect month\' for date \'2018-14-12T15:09:10.609Z\'', () => {
            const actual= () => formatDate('2018-14-12T15:09:10.609Z');
            assert.throws(actual, /Incorrect month/);
        });
        it('should throw new Error \'Incorrect day\' for date \'2016-02-30T15:09:10.609Z\'', () => {
            const actual= () => formatDate('2016-02-30T15:09:10.609Z');
            assert.throws(actual, /Incorrect day/);
        });
        it('should throw new Error \'Incorrect day\' for date \'2018-02-29T15:09:10.609Z\'', () => {
            const actual= () => formatDate('2018-02-29T15:09:10.609Z');
            assert.throws(actual, /Incorrect day/);
        });
        it('should throw new Error \'Incorrect time\' for date \'2018-04-14T25:09:10.609Z\'', () => {
            const actual= () => formatDate('2018-04-14T25:09:10.609Z');
            assert.throws(actual, /Incorrect time/);
        });
        it('should throw new Error \'Incorrect time\' for date \'2018-04-14T15:60:10.609Z\'', () => {
            const actual= () => formatDate('2018-04-14T15:60:10.609Z');
            assert.throws(actual, /Incorrect time/);
        });
         it('should throw new Error \'Future year\' for date \'2019-04-14T15:09:10.609Z\'', () => {
            const actual= () => formatDate('2019-04-14T15:09:10.609Z');
            assert.throws(actual, /Future year/);
        });
        it('should throw new Error \'Future month\' for date \'2018-05-14T15:09:10.609Z\'', () => {
            const actual= () => formatDate('2018-05-14T15:09:10.609Z');
            assert.throws(actual, /Future month/);
        });
        it('should throw new Error \'Future day\' for date \'2018-04-30T15:09:10.609Z\'', () => {
            const actual= () => formatDate('2018-04-30T15:09:10.609Z');
            assert.throws(actual, /Future day/);
        });
        it('should throw new Error \'Future time\' for date \'2018-04-14T23:09:10.609Z\'', () => {
            const actual= () => formatDate('2018-05-20T15:09:10.609Z');
            assert.throws(actual, /Future time/);
        });

        it('should print Only time for today', runSuccessTest('2018-04-18T10:09:10.609Z',"10:09"));
        it('should print yesterday and time for yesterday', runSuccessTest('2018-04-17T15:09:10.609Z',"вчера в 15:09"));
        it('should not print years for this year', runSuccessTest('2018-02-15T15:09:10.609Z', "15 февраля в 15:09"));
        it('should print all for previous year', runSuccessTest('2017-03-25T16:09:10.609Z', "25.03.2017 в 16:09"));

    });



describe('showTweets', () => {
    it('should print date and tweet', () => {
        const formatDate = sinon.stub();
        formatDate.withArgs('2018-04-15T15:09:10.609Z').returns('вчера в 15:09');
        formatDate.withArgs('2016-12-25T12:00:10.123Z').returns('25 марта 2016 года в 15:09');
        formatDate.throws('Illegal arguments');

        const showTweets = proxyquire('../lib/index', {
            './formatDate': formatDate
        });
        const actual = showTweets();
        var result = "вчера в 15:09 Библиотека #nock позволяет не только удобно писать тесты, но и вести разработку фронтеда, в то время, когда бекенд ещё только проектируется! #urfu-testing-2017 25 марта 2016 года в 15:09 Для подмены модулей раньше я использовал #mockery, а сейчас всей душой полюбил #proxyquire. #urfu-testing-2017 Конец";
        assert.equal(actual, result);
    });
});