//core modules
const path = require('path');
//external modules
const expess = require("express");
const hostRouter = expess.Router();

//local modules
const rootDir = require('../utils/pathUtil');

hostRouter.get("/add-home", (req, res) => {
 res.sendFile(path.join( rootDir, 'views', 'addHome.html'));
});
hostRouter.post("/add-home", (req, res) => {
  console.log(req.body);
  res.sendFile(path.join(rootDir, 'views', 'homeAdded.html'));
});

module.exports = hostRouter;
