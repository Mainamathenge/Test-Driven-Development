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
  const postValidUser = () => {
    return request(app).post('/api/1.0/users').send({
      username: 'user1',
      email: 'user1@gmail.com',
      password: 'password',
    });
  };
  it('returns 200 ok when signup request is valid', async () => {
    const response = await postValidUser();
    expect(response.status).toBe(200);
  });

  it('It returns a success message when a signup request is valid', async () => {
    const response = await postValidUser();
    expect(response.body.message).toBe('User Created');
  });

  it('it saves the user to the database', async () => {
    await postValidUser();
    const userList = await User.findAll();
    expect(userList.length).toBe(1);
  });
  it('it saves the username and email to db', async () => {
    await postValidUser();
    const userList = await User.findAll();
    const savedUser = userList[0];
    expect(savedUser.username).toBe('user1');
    expect(savedUser.email).toBe('user1@gmail.com');
  });
  it('hashes the password in database', async () => {
    await postValidUser();
    const userList = await User.findAll();
    const savedUser = userList[0];
    expect(savedUser.password).not.toBe('password');
  });
});
