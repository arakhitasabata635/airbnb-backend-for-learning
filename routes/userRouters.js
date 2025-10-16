//core modules
const path = require('path');
//external modules
const express = require('express');
const userRouter = express.Router();

//local modules
const rootDir = require('../utils/pathUtil');
const { registerdHomes } = require('./hostRouter');

userRouter.get('/', (req, res) => {
  console.log(registerdHomes);
  res.render('home', { registerdHomes: registerdHomes , pageTitle: 'airbnb home' });
});

module.exports = userRouter;