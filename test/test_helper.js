const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/users_test');

before((done) => {
  mongoose.connection
          .once('open', () => {
            done();
            console.log('Connection Established');
          })
          .on('error', () => {
            console.warn('Warning', error);
  });
});


beforeEach((done) => {
  const { users, blogposts, comments } = mongoose.connection.collections;

  users.drop(() =>  blogposts.drop(() => comments.drop(() => {
        done();
      })));
  });
