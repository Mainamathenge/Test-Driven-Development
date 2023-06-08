const express = require('express');
const UserService = require('./UserService');
const router = express.Router();

router.post('/api/1.0/users', async (req, res) => {
  const user = req.body;
  console.log(user.username);
  if (user.username === null) {
    return res.status(400).send({validationErrors:{}});
  }
  await UserService.save(req.body);
  return res.send({ message: 'User Created' });
});

module.exports = router;
