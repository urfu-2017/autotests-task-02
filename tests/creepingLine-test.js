const assert = require('assert');
const creepingLine = require('../lib/creepingLine');
const sinon = require('sinon');

describe('creepingLine', () => {
    beforeEach(() => {
        clock = sinon.useFakeTimers();
    });

    afterEach(() => {
        clock.restore();
    });

    it('should print letters one by one', done => {
        const spy = sinon.spy(process.stdout, 'write');
        creepingLine('Библиотека #nock позволяет не только удобно писать тесты, ' +
        'но и вести разработку фронтеда, в то время, когда бекенд ещё ' +
        'только проектируется! #urfu-testing-2017', () => {
            assert.equal(spy.callCount, 159);
            done();
        });
        clock.tick(30000);
    });
})