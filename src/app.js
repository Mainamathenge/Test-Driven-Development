const express = require('express');
const UserRouter = require('./User/userRouter');
const app = express();

app.use(express.json());

app.use(UserRouter);

module.exports = app;
