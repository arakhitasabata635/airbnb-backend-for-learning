const Home = require("../models/home");

exports.getAddHome = (req, res) => {
  res.render("host/addHome", {
    pageTitle: "add home to airbnb",
    currentPage: "add-home",
  });
};

exports.postAddHome = (req, res) => {
  const { houseName, price, location, rating, image } = req.body;
  const home = new Home(houseName, price, location, rating, image);
  home.save();

  res.render("host/homeAdded.ejs", {
    pageTitle: "home added sucessfully",
    currentPage: "add-home",
  });
};

exports.getHomes = (req, res) => {
  const registerdHomes = Home.fetchAll((registerdHomes) => {
    res.render("store/home-list", {
      registerdHomes: registerdHomes,
      pageTitle: "airbnb home",
      currentPage: "home",
    });
  });
};
