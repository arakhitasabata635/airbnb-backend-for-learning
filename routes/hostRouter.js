//core modules
const path = require("path");
//external modules
const express = require("express");
const hostRouter = express.Router();

//local modules
const rootDir = require("../utils/pathUtil");

const registerdHomes = [];

hostRouter.get("/add-home", (req, res) => {
  res.render("addHome" , { pageTitle: "add home to airbnb" });
});
hostRouter.post("/add-home", (req, res) => {
  registerdHomes.push({ houseName: req.body.houseName });
  res.render( "homeAdded.ejs" , { pageTitle: "home added sucessfully" });
});

exports.hostRouter = hostRouter;
exports.registerdHomes = registerdHomes;
