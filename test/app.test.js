const request = require('supertest');
const app = require('../lib/app');


describe('user tests', () => {
  it('signs up a new user', () => {
    return request(app)
      .post('/auth')
      .send({ email: 'tyler@gmail.com', password: 'abc123' })
      .then(res => {
        expect(res.body).toEqual({
          email: 'tyler@gmail.com',
          password: expect.any(String),
          _id: expect.any(String)
        });
      });
  });
});


