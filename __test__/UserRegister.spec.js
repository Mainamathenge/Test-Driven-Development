const request = require('supertest');
const app = require('../app');

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
      expect(response.status).toBe('User Created');
      done();
    });
});
