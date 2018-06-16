const User = require('../src/user');
const assert = require('assert');


describe('reading the user from database', () => {
  let joe, adam, mike, sai;
  beforeEach((done) => {
    joe = new User({name: 'Jonathan'});
    adam = new User({name: 'Adam'});
    mike = new User({name: 'Mike'});
    sai = new User({name: 'Sai'});

    Promise.all([joe.save(), adam.save(), mike.save(), sai.save()])
          .then(() => {
            done();
          })
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

  it('sorting, skipping and limiting the Result Set', (done) => {
    //Gives the list of all users
    User.find({})
        .sort({ name: 1}) //Sort by name ascending
        .skip(2) //Skips first 2 record
        .limit(2) //Limits result count to 2
        .then((users) => {
          assert(users.length === 2);
          assert(users[0].name === 'Mike');
          assert(users[1].name === 'Sai');
          done();
        })
  })

});
