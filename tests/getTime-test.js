const assert = require('assert');
const getTime = require('../lib/getTime');

describe('getTime', () => {
    const trickyDates = [
        {
            date: '2018-04-17T10:57:49.973Z',
            expected: '10:57'
        },
        {
            date: '2018-04-17T07:50:49.973Z',
            expected: '07:50'
        },
        {
            date: '2018-04-17T23:59:59.999Z',
            expected: '23:59'
        },
        {
            date: '2018-04-17T00:00:00.000Z',
            expected: '00:00'
        }
    ];
    
    trickyDates.forEach(({ date, expected }) => {
        it(`should return ${expected} for ${date}`, () => {        
            const actual = getTime(new Date(date));

            assert.equal(actual, expected); 
        });
    });
});
