const { check, validationResult } = require("express-validator");
const User= require("../models/user")

exports.getLogin = (req, res) => {
  res.render("auth/login", {
    pageTitle: "login to your account",
    currentPage: "login",
    isLoggedIn: false,
  });
};

exports.postLogin = (req, res) => {
  const { email, password } = req.body;
  req.session.isLoggedIn = true;
  // Implement  authentication logic here
  //res.cookie("isLoggedIn", true)
  //req.isLoggedIn = true;
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "signup",
    currentPage: "signup",
    isLoggedIn: false,
    errors:[],
    oldInput: { firstName: "", lastName:"", email:"", userType:"" }
  });
};
exports.postSignup = [
  check("firstName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name should be at least 2 characters long")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("First name must contain only letters"),

  check("lastName")
    .matches(/^[A-Za-z\s]*$/)
    .withMessage("last name must contain only letters"),

  check("email")
    .isEmail()
    .withMessage("please enter a valid email")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("password should be alleast 8 charcters long")
    .matches(/[A-Z]/)
    .withMessage("password should contain one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("password should contain one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("password should contain one one number")
    .trim(),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Posswords do not match");
      }
      return true;
    }),

  check("userType")
    .notEmpty()
    .withMessage("please select a user type")
    .isIn(["guest", "host"])
    .withMessage("Invalied user type"),

  check("terms")
    .notEmpty()
    .withMessage("please accept the term and condition")
    .custom((value, { req }) => {
      if (value !== "on") {
        throw new Error("please essept the term and condition");
      }
      return true;
    }),

  (req, res, next) => {
    const { firstName, lastName, email,password, userType } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        pageTitle: "signup",
        currentPage: "signup",
        isLoggedIn: false,
        errors: errors.array().map((err) => err.msg),
        oldInput: { firstName, lastName, email, userType },
      });
    }

    const user = new User({firstName, lastName, email, password, userType});
    user.save().then(()=>{
      res.redirect("/login");
    }).catch(err => {
      return res.satatus(442).render("auth/signup", {
        pageTitle: "signup",
        currentPage: "signup",
        isLoggedIn: false,
        errors: [err.message],
        oldInput: { firstName, lastName, email, userType },
      });
    })
  },
];
