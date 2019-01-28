require('dotenv').config();
const connect = require('../lib/utils/connect');

const request = require ('supertest');
const mongoose = require ('mongoose');

describe('app', () => {

  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  it('can sig nup a user', () => {

  });
});
