const getTweets = require('./getTweets');
const formatDate = require('./formatDate');
const print = require('./print');

module.exports = function showTweets() {

    var result = "";
    const tweets = getTweets('#urfu-testing-2017');
    for (var i=0; i<tweets.length; i++){
        var date = tweets[i].created_at;
        result += formatDate(date) +" "+ tweets[i].text +" ";
    }
    result += "Конец";
    print(result);
    return result;

};
