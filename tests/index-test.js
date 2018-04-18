'use strict'
const proxyquire = require('proxyquire');
const assert = require('assert');
const sinon = require('sinon');

describe('showTweets', () => {

    it('should calls `formatDate` n times', () => {
            const formatDate = sinon.spy();
            proxyquire('../lib/index', {
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

                    './formatDate': formatDate
            })();

                assert.equal(formatDate.callCount, 5);
       });


    it('should return empty tweet', () => {
        const print = sinon.spy();
    let tweets = proxyquire('../lib/index', {
            './print': print,
            './getTweets': () => []
    })();

    print(tweets);
    sinon.assert.calledWith(print, sinon.match.array.deepEquals([]));
    });


});

var MONTHLIST=[
    "января",
    "феврвля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря"
];

const formatDate = require('../lib/formatDate');
describe('formatDate', () => {
    it('should return 11 апреля в 15:09 for 2018-04-11T15:09:10.609Z', () => {
    const actual = formatDate('2018-04-11T15:09:10.609Z');
    assert.equal(actual, '11 апреля в 15:09');
    });

var date=new Date();
date.setDate(date.getDate() - 1);
var hour = date.getUTCHours();
var minute = date.getUTCMinutes();

if (minute < 10) minute = "0" + minute;
if (hour < 10) hour = "0" + hour;

var str='вчера в '+ hour + ':'+ minute;

    it('should return '+ str + ' for ' + date.toUTCString(), () => {
        const actual = formatDate(date);
    assert.equal(actual, str);
    });



var date2=new Date();
var hour2 = date2.getUTCHours();
var minute2 = date2.getUTCMinutes();
if (minute2 < 10) minute2 = "0" + minute2;
if (hour2 < 10) hour2 = "0" + hour2;
var str2=hour2 + ':'+ minute2;
    it('should return '+ str2 + ' for ' + date2.toUTCString(), () => {
        const actual = formatDate(date2);
    assert.equal(actual, str2);
    });


var date3=new Date();
date3.setUTCFullYear(date3.getUTCFullYear() - 1);

var hour3 = date3.getUTCHours();
var minute3 = date3.getUTCMinutes();
var year=date3.getFullYear();
var month=date3.getUTCMonth();
var numDay = date3.getUTCDate();

if (minute3 < 10) minute3 = "0" + minute3;
if (hour3 < 10) hour3 = "0" + hour3;

var str3=numDay+ " " + MONTHLIST[month]+ " " + year + " года " + "в "+ hour3+":"+minute3;
    it('should return '+ str3 + ' for ' + date3.toUTCString(), () => {
        const actual = formatDate(date3);
    assert.equal(actual, str3);
    });

});
