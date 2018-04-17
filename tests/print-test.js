const { spy } = require('sinon');
const assert = require('assert');
const proxyquire = require('proxyquire');

//describe('print', () => {
//   it('should print 2 lines anyway', () => {
//       const console.log = spy();
//       const print = proxyquire('../lib/print', {
//           'console.log': console.log
//       })();
//       
//       assert.equal(console.log.callCount, 2);
//   }); 
//});