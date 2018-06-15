const assert = require('assert');
const User = require('../src/user');

describe('Validate the user data', () => {

  it('User name is required', () => {
    let user = new User({name: undefined});
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name is required');
  })

  it('User name should be greater than 2 characters', () => {
    let user = new User({name: 'Sa'});

    const validationResult = user.validateSync();

    const {message} = validationResult.errors.name;
//
    assert(message === 'Name should be greater than 2 characters');
  });

  it('Disallow inserting invalid user data', (done) => {
    let user = new User({name: 'Sa'});

    user.save()
        .catch((validationResult) => {
            const {message} = validationResult.errors.name;
            assert(message === 'Name should be greater than 2 characters');
            done();
        })
  })


})
