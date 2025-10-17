//external modules
const express = require("express");
const hostRouter = express.Router();

//local modules
const hostControllers = require("../controllers/hostControler");

hostRouter.get("/add-home", hostControllers.getAddHome);
hostRouter.post("/add-home", hostControllers.postAddHome);
hostRouter.get("/host-home-list", hostControllers.getHostHomes);


exports.hostRouter = hostRouter;
