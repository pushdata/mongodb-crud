const assert = require('assert');
const User = require('../src/user');




describe('Updating user in database', () => {

   function assertNameChange(callback, done) {
     callback.then(() => {
         User.find({})
         .then((users) => {
           assert(users.length === 1);
           assert(users[0].name === 'Sai Prudhvi');
           done();
         })
     });
   }

   let user;

   beforeEach((done) => {
     user = new User({name: 'Sai'});
     user.save(() => {
       done();
     })
   });

   it('Model Instance Update', (done) => {
      assertNameChange(user.update({'name': 'Sai Prudhvi'}), done);

   });

   if('Model Instance set/save', (done) => {
      user.set('name', 'Sai Prudhvi');
      assertNameChange(user.save(), done);
   });

   it('Model Class Update', (done) => {
     assertNameChange(User.update({name: user.name}, {name: 'Sai Prudhvi'}), done);
   });

   it('Model Class findOneAndUpdate', (done) => {
      assertNameChange(User.findOneAndUpdate({_id: user._id}, {name: 'Sai Prudhvi'}), done);
   });

   it('Modal Class findByIdAndUpdate', (done) => {
     assertNameChange(User.findByIdAndUpdate(user._id, {name: 'Sai Prudhvi'}), done);
   });

})
