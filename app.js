//core modules
const path = require("path");
//external modules
const express = require("express");

//Local modules
const storeRouters = require("./routes/storeRouters");
const { hostRouter } = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");
const errorControllers = require("./controllers/error");
const { default: mongoose } = require("mongoose");

//app initialization
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(rootDir, "views"));

app.use(express.static(path.join(rootDir, "public")));

app.use(express.urlencoded());

app.use(storeRouters);
app.use("/host", hostRouter);

app.use(errorControllers.pageNotFound);

//server setup
const PORT = 3000;
const MONGO_URL =
  "mongodb+srv://root:root@airbnb.ziazdyk.mongodb.net/airbnb?retryWrites=true&w=majority&appName=airbnb";

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("connected to mongoose");
    app.listen(PORT, () => {
      console.log(`server is runing on port http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error while connecting to mongoose", err);
  });
