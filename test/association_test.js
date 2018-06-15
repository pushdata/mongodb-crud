const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogpost');
const Comment = require('../src/comment');

describe('Test association among collections', () => {

   let sai, blogpost, comment;

   beforeEach((done) => {
    sai = new User({name: 'Sai'});
    blogpost = new BlogPost({title: 'Angular tutorial', content: 'About angular Framework details'});
    comment = new Comment({content: 'Nice article'});

    sai.blogPosts.push(blogpost);
    blogpost.comments.push(comment);
    comment.user = sai;

    Promise.all([sai.save(), blogpost.save(), comment.save()])
        .then(() => {
          done();
        });
  });

  it.only('Checks the association between user & blogpost collection', (done) => {
    User.findOne({name: 'Sai'})
        .then((user) => {
          console.log(user);
          done();
        })
  });



});
