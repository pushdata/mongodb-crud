const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: String,
  content: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'commment'
  }]
});

const Blog = mongoose.model('blogpost', BlogPostSchema);

module.exports = Blog;
