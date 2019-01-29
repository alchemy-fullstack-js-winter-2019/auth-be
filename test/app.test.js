require('dotenv').config();
const connect = require();

const request = require('supertest');
const mongoose = require('mongoose');

describe('app', () => {
  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  afterAll(done => {
    mongoose.connection.close(done);
  });

  it('can /signup a user', () => {
    
  });
});