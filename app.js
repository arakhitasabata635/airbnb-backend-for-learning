//core modules
const path = require("path");
//external modules
const express = require("express");
const session = require("express-session");
const MongoDBStore= require("connect-mongodb-session")(session);
const MONGO_URL =
  "mongodb+srv://root:root@airbnb.ziazdyk.mongodb.net/airbnb?retryWrites=true&w=majority&appName=airbnb";
//Local modules
const storeRouters = require("./routes/storeRouters");
const { hostRouter } = require("./routes/hostRouter");
const authRouters = require("./routes/authRouters");
const rootDir = require("./utils/pathUtil");
const errorControllers = require("./controllers/error");
const { default: mongoose } = require("mongoose");

//app initialization
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(rootDir, "views"));

const store = new MongoDBStore({
  uri: MONGO_URL,
  collection: 'sessions'
})
app.use(express.static(path.join(rootDir, "public")));

app.use(express.urlencoded());
app.use(
  session({
    secret: "this is a airbnb app",
    resave: false,
    saveUninitialized: true,
    store,
  })
);
app.use((req, res, next) => {
  console.log(req.get("cookie"));
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});
app.use(authRouters);
app.use(storeRouters);
app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use("/host", hostRouter);

app.use(errorControllers.pageNotFound);

//server setup
const PORT = 3000;


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
