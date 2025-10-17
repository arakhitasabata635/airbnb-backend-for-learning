//core modules
const path = require('path');
//external modules
const express = require('express');

//Local modules
const storeRouters = require('./routes/storeRouters');
const {hostRouter} = require('./routes/hostRouter');
const rootDir = require('./utils/pathUtil');
const errorControllers = require("./controllers/error");

//app initialization
const app = express();

app.set('view engine', 'ejs');
app.set ('views', path.join(rootDir, 'views'));

app.use(express.static(path.join(rootDir, 'public')));

app.use(express.urlencoded());

app.use(storeRouters);
app.use("/host",hostRouter);  

app.use(errorControllers.pageNotFound);


//server setup
const PORT=3000;
app.listen(PORT, ()=>{
  console.log(`server is runing on port http://localhost:${PORT}`);
})