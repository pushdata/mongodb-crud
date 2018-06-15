const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {name: {
    type: String,
    required: [true, 'Name is required'],
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name should be greater than 2 characters'
    }
  },
  postCount: Number});

const User = mongoose.model('user', UserSchema);

module.exports = User;
