//external modules
const express = require("express");
const authRouters = express.Router();

//local modules
const authControllers = require("../controllers/authControler");

authRouters.get("/login", authControllers.getLogin);
authRouters.post("/login", authControllers.postLogin);
authRouters.post("/logout", authControllers.postLogout);
authRouters.get("/signup", authControllers.getSignup);
authRouters.post("/signup", authControllers.postSignup);

module.exports = authRouters;
