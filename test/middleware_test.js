const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogpost');


describe('Middleware to remove all blogposts upon user removal', () => {

  let sai, blogpost, comment;

  beforeEach((done) => {
   sai = new User({name: 'Sai'});
   blogpost = new BlogPost({title: 'Angular tutorial', content: 'About angular Framework details'});

   sai.blogPosts.push(blogpost);
   blogpost.comments.push(comment);

   Promise.all([sai.save(), blogpost.save()])
       .then(() => {
         done();
       });
  });

  it('Removing all blogposts of deleted user using Middleware', (done) => {
    //Below statement will invoke the remove middleware setup in UserSchema
    sai.remove()
      .then(() => BlogPost.count())
      .then((count) => {
        assert(count === 0);
        done();
      });
  });

})
