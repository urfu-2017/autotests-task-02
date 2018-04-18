/**
 * Вывод текста на экран часов
 * @param {String} text - строка, которая будет отправлена на экран часов
 * @returns {Promise}
 */
module.exports = function print(text) {
    const timeInterval = 100;
    return new Promise((resolve, reject) => {
        if (typeof text !== 'string') {
            reject();
        }
        let index = 0;
        let idInterval = setInterval(() => {
            if (index === text.length) {
                clearInterval(idInterval);
                console.log();
                resolve();
                return;
            }
            process.stdout.write(text[index++]);
        }, timeInterval);
    });
};