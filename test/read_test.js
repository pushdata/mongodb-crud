const User = require('../src/user');
const assert = require('assert');


describe('reading the user from database', () => {
  let joe;
  beforeEach((done) => {
    joe = new User({name: 'Jonathan'});
    joe.save().then(() => {
      done();
    });
});

  it('finding user with name jonathan', (done) => {
    User.find({name: 'Jonathan'}).then((users) => {
      assert(users[0]._id.toString() === joe._id.toString());
      done();
    })
  });

  it('finding user with given id', (done) => {
    User.findOne({ _id: joe._id}).then((user) => {
       assert(user.name === 'Jonathan');
       done();
    })
  });

});
