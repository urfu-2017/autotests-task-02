/**
 * Вывод текста на экран часов
 *
 * @param {Array} tweets - массив твитов, 
 * которые должны последовательно посимвольно выводиться на экран часов
 */
const print = tweets => {
    const ticker = tweets
        .reduce((str, tweet) => str + tweet.created_at + ' ' + tweet.text + '   ', '')
        .slice(0, -3);
    
    let i = 0;
    const printInt = setInterval(() => {
        console.clear();
        i !== ticker.length ? console.log(ticker[i++]) : clearInterval(printInt);
    }, 100);
};

module.exports = print;