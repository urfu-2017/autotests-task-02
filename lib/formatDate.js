const moment = require('moment'); 

module.exports = function formatDate(date) { 

var currentDate = moment(new Date);
var tweetDate = moment(new Date(date)).locale('ru'); 

if ((!tweetDate.isValid())) { 
throw new TypeError('Invalid date'); 
} 
if (currentDate.isBefore(tweetDate)) { 
throw new TypeError('Future date'); 
} 

if(currentDate.startOf('day') <= tweetDate) 
    return tweetDate.format('HH:mm'); 
else if(currentDate.subtract(1, 'days').startOf('day') <= tweetDate) 
    return tweetDate.format('вчера в HH:mm'); 
else if(currentDate.startOf('year') <= tweetDate) 
    return tweetDate.format('DD MMMM в HH:mm'); 
else if(currentDate.startOf('year') > tweetDate) 
    return tweetDate.format('DD MMMM YYYY года в HH:mm'); 
};