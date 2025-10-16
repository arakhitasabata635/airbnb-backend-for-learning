
//external modules
const express = require('express');
const userRouter = express.Router();

//local modules
const homeControllers = require("../controllers/homes");
userRouter.get('/', homeControllers.getHomes);

module.exports = userRouter;