//external modules
const express = require("express");
const hostRouter = express.Router();

//local modules
const homeControllers = require("../controllers/homes");

hostRouter.get("/add-home", homeControllers.getAddHome);
hostRouter.post("/add-home",homeControllers.postAddHome);

exports.hostRouter = hostRouter;
