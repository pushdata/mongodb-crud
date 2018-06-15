const assert = require('assert');
const User = require('../src/user');

describe('Creating a sub document', () => {

  let john;

  beforeEach((done) => {
    john = new User({name: 'john', posts: [{title: 'Johns Automobiles'}]});
    john.save()
        .then(() => {
          done();
        });
  });


  it('Creating & adding a post to user', (done) => {
      let user = new User({name: 'Sai'});
      user.save()
          .then(() => {
            return User.findOne({name: 'Sai'})
          })
          .then((user) => {
              user.posts.push({title: 'A sample post'});
              return user.save()
          })
          .then(() => User.findOne({name: 'Sai'}))
          .then((user) => {
            assert(user.posts[0].title === 'A sample post');
            done();
          })
    });


    it('Removing a post from an existing user', (done) => {
        User.findOne({name: 'john'})
            .then((user) => {
                let post = user.posts[0];
                post.remove();
                return user.save()
            })
            .then(() => User.findOne({name: 'john'}))
            .then((user) => {
                assert(user.posts.length === 0);
                done();
            })
    })
})
