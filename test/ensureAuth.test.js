require('dotenv').config();
const { bearerToken, ensureAuth } = require('../lib/middleware/ensureAuth');
const { tokenize } = require('../lib/utils/token');

describe('ensureAuth', () => {
  it('can get a bearer token', () => {

    const req = {
      get: () => 'Bearer abcd1234' //get is the key..property that is a function equvalent to get() { return 'Bearer abcd1234'}
    };

    const next = jest.fn(); //using this jest function to call the next function

    bearerToken(req, {}, next); //response just sending an empty object

    expect(req.token).toEqual('abcd1234');
    expect(next).toHaveBeenCalled();
  });

  it('can ensureAuth', () => { //this should get us a user back
    //use tokenize to create a token
    const token = tokenize ({ email: 'pony@yahoo.com' });
    //create req with the token
    const req = {
      token
    };
    //expect req.user to equal the token payload
    const next = jest.fn(); //creates a fake function that lets you know how many times it's been called
    ensureAuth(req, {}, next)
      .then(() => {
        expect(req.user).toEqual({ email: 'pony@yahoo.com' });
        expect(next).toHaveBeenCalled();


      });
  });
});
