const proxyquire = require('proxyquire');
const assert = require('assert');
const sinon = require('sinon');
const { formatDate, fillLeft, month } = require('../lib/formatDate');

describe('showTweets', () => {
    it('Вызывается ф-ия print', () => {
        const print = sinon.spy();
        const showTweets = proxyquire(
            '../lib/index',
            { './print': print }
        );

        showTweets();

        assert.ok(print.called);
    });

    it('Вызывается ф-ия formatDate', () => {
        const print = sinon.spy();
        const formatDateMock = sinon.spy();
        const showTweets = proxyquire(
            '../lib/index',
            {
                './print': print,
                './formatDate': { formatDate: formatDateMock }
            }
        );

        showTweets();

        assert.ok(formatDateMock.called);
    });

    it('ф-ия formatDate принимает поле created_at результата объектов массива ф-ии getTweets', () => {
        const print = sinon.spy();
        const formatDateMock = sinon.stub();
        const getTweets = sinon.stub();
        const currentDate = new Date();
        getTweets.withArgs().returns([{ created_at: currentDate }]);
        formatDateMock.withArgs(currentDate).returns('some format');
        const showTweets = proxyquire(
            '../lib/index',
            {
                './print': print,
                './formatDate': { formatDate: formatDateMock },
                './getTweets': getTweets
            }
        );

        showTweets();

        assert.ok(print.calledWith('some format'));
    });

    it('ф-ия print принимает результат ф-ии formatDate', () => {
        const print = sinon.spy();
        const formatDateMock = sinon.spy();
        const getTweets = sinon.stub();
        const currentDate = new Date();
        getTweets.withArgs().returns([{ created_at: currentDate }]);
        const showTweets = proxyquire(
            '../lib/index',
            {
                './print': print,
                './formatDate': { formatDate: formatDateMock },
                './getTweets': getTweets
            }
        );

        showTweets();

        assert.ok(formatDateMock.calledWith(currentDate));
    });
});

describe('formatDate', () => {
    describe('Корректные входные данные', () => {
        describe('Сегодня', () => {
            getTestCaseForToday().forEach(date => {
                [
                    date,
                    date.getTime(),
                    date.toISOString()
                ].forEach(dateFormat => {
                    it(`Должен вернуть в формате 'Сегодня' с аргументом Date в формате ${dateFormat}`, () => {
                        assert.equal(formatDate(date),
                            `${fillLeft(date.getHours(), 2, '0')}:${fillLeft(date.getMinutes(), 2, '0')}`);
                    })
                })
            });
        });

        describe('Вчера', () => {
            getTestCaseForYesterday().forEach(date => {
                [
                    date,
                    date.getTime(),
                    date.toISOString()
                ].forEach(dateFormat => {
                    it(`Должен вернуть в формате 'Вчера' с аргументом Date в формате ${dateFormat}`, () => {
                        assert.equal(formatDate(date),
                            `вчера в ${fillLeft(date.getHours(), 2, '0')}:${fillLeft(date.getMinutes(), 2, '0')}`);
                    })
                })
            });
        });

        describe('Текущий год', () => {
            getTestCaseForCurrentYear().forEach(date => {
                [
                    date,
                    date.getTime(),
                    date.toISOString()
                ].forEach(dateFormat => {
                    it(`Должен вернуть в формате 'Текущий год' с аргументом Date в формате ${dateFormat}`, () => {
                        assert.equal(formatDate(date),
                            `${fillLeft(date.getDate(), 2, '0')} ${month[date.getMonth()]} ` +
                            `в ${fillLeft(date.getHours(), 2, '0')}:${fillLeft(date.getMinutes(), 2, '0')}`);
                    })
                })
            });
        });

        describe('Прошлый год', () => {
            getTestCaseForLastYears().forEach(date => {
                [
                    date,
                    date.getTime(),
                    date.toISOString()
                ].forEach(dateFormat => {
                    it(`Должен вернуть в формате 'Прошлый год' с аргументом Date в формате ${dateFormat}`, () => {
                        assert.equal(formatDate(date),
                            `${fillLeft(date.getDate(), 2, '0')} ${month[date.getMonth()]} ` +
                            `${date.getFullYear()} года ` +
                            `в ${fillLeft(date.getHours(), 2, '0')}:${fillLeft(date.getMinutes(), 2, '0')}`);
                    })
                })
            });
        });
    });
    describe('Некорректные входные данные', () => {
        [
            [],
            undefined,
            () => {},
            {}
        ].forEach(input => {
            it(`Должно выброситься исключение c типом данных аргумента ${typeof input}: ${input}`, () => {
                assert.throws(() => formatDate(input))
            });
        })
    });
});

function getTestCaseForToday() {
    const today = [new Date()];
    {
        const date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        today.push(date);
    }

    return today;
}

function getTestCaseForYesterday() {
    const yesterday = [];
    {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        yesterday.push(date);
    }
    {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        date.setHours(23);
        date.setMinutes(59);
        yesterday.push(date);
    }
    {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        date.setHours(0);
        date.setMinutes(0);
        yesterday.push(date);
    }

    return yesterday;
}

function getTestCaseForCurrentYear() {
    const currentYear = [];
    {
        const date = new Date();
        date.setDate(date.getDate() - 2);
        currentYear.push(date);
    }
    {
        const date = new Date();
        date.setDate(date.getDate() - 2);
        date.setHours(23);
        date.setMinutes(59);
        currentYear.push(date);
    }

    return currentYear;
}

function getTestCaseForLastYears() {
    const yesteryear = [];
    {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 1);
        yesteryear.push(date);
    }
    {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 1);
        date.setDate(1);
        date.setMonth(0);
        yesteryear.push(date);
    }
    {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 3);
        yesteryear.push(date);
    }

    return yesteryear;
}
