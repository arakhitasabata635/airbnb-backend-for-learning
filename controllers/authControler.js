exports.getLogin = (req, res) => {
  res.render("auth/login", {
    pageTitle: "login to your account",
    currentPage: "login",
    isLoggedIn:false,
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
}

exports.postLogout= (req,res,next)=>{
  res.cookie("isLoggedIn", false)
  res.redirect("/login")
}
