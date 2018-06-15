const assert = require('assert');
const User = require('../src/user');

describe('Create Records', () => {
  it('saving the user', (done) => {
    const john = new User({name: 'John'});
    john.save().then(() => {
      assert(!john.isNew);
      done();
    });
  })
})
