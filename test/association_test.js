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

  it('Checks the association between user & blogpost collection', (done) => {
    User.findOne({name: 'Sai'})
        .then((user) => {
          done();
        })
  });

  it('Loading nested association - Depth 1 ', (done) => {
    User.findOne({name: 'Sai'})
        .populate('blogPosts')
        .then((user) => {
          assert(user.blogPosts[0].title === 'Angular tutorial');
          done();
        });
  });

  it('Loading deeply nested association - Max Depth', (done) => {
    User.findOne({name: 'Sai'})
        .populate({
          path: 'blogPosts',
          populate: {
            path: 'comments',
            model: 'comment',
            populate: {
              path: 'user',
              model: 'user'
            }
          }
        })
        .then((userPosts) => {
          assert(userPosts.blogPosts[0].comments[0].user.name === 'Sai');
          // console.log(JSON.stringify(userPosts, null, 2));
          done();
        })
  })

});
