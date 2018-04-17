const proxyquire = require('proxyquire');
const assert = require('assert');
const sinon = require('sinon');
const moment = require('moment');

describe('showTweets', () => {
	let print = null;
	let showTweets = null;
	let formatDate = null;
	let getTweets = null;
	const thisYear = moment().format('YYYY');
	const today = moment().format('YYYY-MM-DD') + 'T10:00:00.123Z';
	
	before(() => {
		print = sinon.spy();
		formatDate = sinon.stub();
		getTweets = sinon.stub();
		const tweet1 = {
			created_at: today,
			text: 'Text #urfu-testing-2017'
		};
		const tweet2 = {
			created_at: (thisYear - 1) + '-01-10T14:10:10.123Z',
			text: 'Text 2 #urfu-testing-2017'
		};
		formatDate.returns('10:00');
		getTweets.withArgs('#urfu-testing-2017').returns([tweet1, tweet2]);
        showTweets = proxyquire(
            '../lib/index',
            { './print': print, './formatDate': formatDate, './getTweets': getTweets }
        );
	})
	
    it('should print `Конец` after tweets', () => {
        showTweets();
		
        assert.ok(print.calledWith('Конец'));
    });
	
	it('should print tweets with formatted date', () => {
        showTweets();

        assert.deepEqual(print.getCall(0).args[0], {
			created_at: '10:00',
			text: 'Text #urfu-testing-2017'
		});
		assert.deepEqual(print.getCall(1).args[0], {
			created_at: '10:00', text: 'Text 2 #urfu-testing-2017'
		});
    });
	
	it('should get fresh tweets', () => {
        showTweets();

        assert.ok(getTweets.calledWith('#urfu-testing-2017'));
    });
});

describe('formatDate', () => {
	const today = moment().minutes(10).hour(12);
	const todayFormatted = today.format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
	const yesterday = today.add('days', -1);
	const someDayThisYear = moment().date(1).month(3).hour(12).minute(10).seconds(20).milliseconds(123);
	
	const yesterdayFormatted = yesterday.format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
	const someDayThisYearFormatted = someDayThisYear.format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
	const someDayAnotherYearFormatted = someDayThisYear.year(1000).format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
	const invalidDate = 'asd';
    const dates = [{date: todayFormatted, actual: "12:10"}, {date: yesterdayFormatted, actual: "вчера в 12:10"}, 
	    {date: someDayThisYearFormatted, actual: "01 апреля в 12:10"}, {date: someDayAnotherYearFormatted, actual: "01 апреля 1000 года в 12:10"}, {date: invalidDate, actual: ''}];
	dates.forEach(d => {
        it(`should return ${d.actual} for ${d.date}`, () => {
			const formatDate = require('../lib/formatDate');
			let formatted = formatDate(d.date);
			
            assert.equal(formatted, d.actual);
        });
	});
});
