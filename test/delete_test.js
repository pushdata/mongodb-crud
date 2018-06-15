const assert = require('assert');
const User = require('../src/user.js');

describe('Removing a user from database', () => {

  let user;

  beforeEach((done) => {
    user = new User({name: 'Sai Prudhvi'});
    user.save().then(() => {
      User.findOne({_id: user._id}).then((user) => {
        assert(user.name === 'Sai Prudhvi');
        done();
      })
    })
  });

  it('Remove using Model Instance', (done) => {
    user.remove()
        .then(() => {
          User.findOne({_id: user._id })
          .then((user) => {
            assert(user === null);
            done();
          })
        })
  });

  it('Class Method Remove', (done) => {
    User.remove({ name: user.name})
        .then(() => {
            User.findOne({ user: user.name})
                .then((user) => {
                  assert(user === null);
                  done();
                })
        })
  });

  it('Class Method findOneAndRemove', (done)=> {
        User.findOneAndRemove({name: user.name})
             .then(() => {
               User.findOne({_id: user._id})
               .then((user) => {
                 assert(user === null);
                 done();
               })
             })
  });

  it('Class Method findByIdAndRemove', (done) => {
      User.findByIdAndRemove(user._id)
          .then(() => {
            User.findOne({_id: user._id })
            .then((user) => {
              assert(user === null);
              done();
            })
          })
  });

})
