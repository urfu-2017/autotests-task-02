module.exports = function creepingLine(text, cb) {
    let i = 0;
    const timerId = setInterval(() => {
        if (i === text.length) {
            clearInterval(timerId);
            cb();
        }
        process.stdout.write(text[i++]);
    }, 100);
}

