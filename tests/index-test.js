const proxyquire = require('proxyquire');
const assert = require('assert');
const sinon = require('sinon');
const formatDate = require('../lib/formatDate');

describe('showTweets', () => {
    it('should print date and tweet', () => {
	const formatDate = sinon.stub();
    formatDate.withArgs('2018-04-15T15:09:10.609Z').returns('вчера в 15:09');
    formatDate.withArgs('2016-12-25T12:00:10.123Z').returns('25 марта 2017 года в 15:09');
    formatDate.throws('Illegal arguments');

    const showTweets = proxyquire('../lib/index', {
        './formatDate': formatDate
    });	
	const actual = showTweets();
	var result = "вчера в 15:09 Библиотека #nock позволяет не только удобно писать тесты, но и вести разработку фронтеда, в то время, когда бекенд ещё только проектируется! #urfu-testing-2017 25 марта 2017 года в 15:09 Для подмены модулей раньше я использовал #mockery, а сейчас всей душой полюбил #proxyquire. #urfu-testing-2017 Конец";
	assert.equal(actual, result);
	});
});

	function runSuccessTest(date, expected){
	return () => {
		const actual = formatDate(date); assert.equal(actual, expected);
	}
}


describe('formatDate', () => {
	it('should print `Future year` for `2019-04-11`', ()=>{
	const actual = () => formatDate('2019-04-11T15:09:10.609Z'); assert.throws(actual, /Future year/);
	 });
	 it('should print `Future month` for `2018-05-11`', () => {
	const actual = () => formatDate('2018-05-11T15:09:10.609Z'); assert.throws(actual, /Future month/);
	 });
	 it('should print `Future day` for `2018-04-20`', () => {
	const actual = () => formatDate('2018-04-20T15:09:10.609Z'); assert.throws(actual, /Future day/);
	 });
	 it('should print `Incorrect hours` for `25:09:10`', () => {
	const actual = () => formatDate('2018-04-14T25:09:10.609Z'); assert.throws(actual, /Incorrect hours/);
	});
	it('should print `Incorrect minutes` for `10:61:23`', () => {
	const actual = () => formatDate('2018-04-14T10:61:23.609Z'); assert.throws(actual, /Incorrect minutes/);
	 });
	it('should print `non-existent date` for `2018-02-30`', () => {
	const actual = () => formatDate('2018-02-30T15:09:10.609Z'); assert.throws(actual, /non-existent date/);
	 });
	it('should print Only time for today', runSuccessTest('2018-04-16T15:09:10.609Z',"15:09"));
	it('should print yesterday and time for yesterday', runSuccessTest('2018-04-15T15:09:10.609Z',"вчера в 15:09"));
	it('should not print years for this year', runSuccessTest('2018-03-25T15:09:10.609Z', "25 марта в 15:09"));
	it('should print all for previous year', runSuccessTest('2017-03-25T16:09:10.609Z', "25 марта 2017 года в 16:09"));
});