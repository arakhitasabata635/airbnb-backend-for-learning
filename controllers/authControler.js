exports.getLogin = (req, res) => {
  res.render("auth/login", {
    pageTitle: "login to your account",
    currentPage: "login",
  });
};

exports.postLogin = (req, res) => {
  const { email, password } = req.body;
  // Implement  authentication logic here
  res.redirect("/");
}
