//core modules
const path = require("path");
//external modules
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const multer = require("multer");
const { default: mongoose } = require("mongoose");
const MONGO_URL =
  "mongodb+srv://root:root@airbnb.ziazdyk.mongodb.net/airbnb?retryWrites=true&w=majority&appName=airbnb";
//Local modules
const storeRouters = require("./routes/storeRouters");
const { hostRouter } = require("./routes/hostRouter");
const authRouters = require("./routes/authRouters");
const rootDir = require("./utils/pathUtil");
const errorControllers = require("./controllers/error");

//app initialization
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(rootDir, "views"));

const store = new MongoDBStore({
  uri: MONGO_URL,
  collection: "sessions",
});

const randomString = (len) =>
  Array.from({ length: len }, () =>
    String.fromCharCode(97 + Math.floor(Math.random() * 26))
  ).join("");

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, randomString(10) + "-" + file.originalname);
  },
});
const multerOption = {
  storage,
  fileFilter,
};

app.use(express.urlencoded());
app.use(multer(multerOption).single("image"));
app.use(express.static(path.join(rootDir, "public")));
app.use("/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/host/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/homes/uploads", express.static(path.join(rootDir, "uploads")));

app.use(
  session({
    secret: "this is a airbnb app",
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn || false;
  res.locals.user = req.session.user || null;
  next();
});

app.use(authRouters);
app.use(storeRouters);
app.use("/host", (req, res, next) => {
  if (req.session.isLoggedIn) {
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
