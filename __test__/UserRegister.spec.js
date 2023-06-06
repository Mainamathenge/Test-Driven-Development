const request = require('supertest');
const app = require('../src/app');
const User = require('../src/User/user');
const sequelize = require('../src/config/database');

beforeAll(() => {
  return sequelize.sync();
});

beforeEach(() => {
  return User.destroy({ truncate: true });
});

describe('User Registration', () => {
  it('returns 200 ok when signup request is valid', (done) => {
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'user1',
        email: 'user1@gmail.com',
        password: 'password',
      })
      .then((response) => {
        expect(response.status).toBe(200);
        done();
      });
  });

  it('It returns a success message when a signup request is valid', (done) => {
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'user1',
        email: 'user1@gmail.com',
        password: 'password',
      })
      .then((response) => {
        expect(response.body.message).toBe('User Created');
        done();
      });
  });

  it('it saves the user to the database', (done) => {
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'user1',
        email: 'user1@gmail.com',
        password: 'password',
      })
      .then(() => {
        // query the user table and make assertions based on that
        User.findAll().then((userList) => {
          expect(userList.length).toBe(1);
          done();
        });
      });
  });
  it('it saves the username and email to db', (done) => {
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'user1',
        email: 'user1@gmail.com',
        password: 'password',
      })
      .then(() => {
        // query the user table and make assertions based on that
        User.findAll().then((userList) => {
          const savedUser = userList[0];
          expect(userList.length).toBe(1);
          expect(savedUser.username).toBe('user1');
          expect(savedUser.email).toBe('user1@gmail.com');
          done();
        });
      });
  });
  it('hashes the password in database', (done) => {
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'user1',
        email: 'user1@gmail.com',
        password: 'password',
      })
      .then(() => {
        // query the user table and make assertions based on that
        User.findAll().then((userList) => {
          const savedUser = userList[0];
          expect(userList.length).toBe(1);
          expect(savedUser.password).not.toBe('password');
          done();
        });
      });
  });
});
