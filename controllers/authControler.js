exports.getLogin = (req, res) => {
  res.render("auth/login", {
    pageTitle: "login to your account",
    currentPage: "login",
    isLoggedIn: false,
  });
};

exports.postLogin = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
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
  });
};
exports.postSignup = (req, res, next) => {
  console.log(req.body);
 res.redirect("/login")
};
