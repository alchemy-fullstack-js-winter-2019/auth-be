require('dotenv').config();
require('../lib/utils/connect')();
const request = require('supertest');
const app = require('../lib/app');


describe('user tests', () => {
  it('signs up a new user', () => {
    return request(app)
      .post('/auth/signup')
      .send({ email: 'tyler@gmail.com', password: 'abc123' })
      .then(res => {
        expect(res.body).toEqual({
          user:{
            email: 'tyler@gmail.com',
            _id: expect.any(String)
          },
          token: expect.any(String)
        });
      });
  });
});


