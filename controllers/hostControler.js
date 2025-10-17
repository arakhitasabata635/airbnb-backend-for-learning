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
  res.render("host/home-added.ejs", {
    pageTitle: "home added sucessfully",
    currentPage: "add-home",
  });
};

exports.getHostHomes = (req, res) => {
   Home.fetchAll((registerdHomes) => {
    res.render("host/host-home-list", {
      registerdHomes: registerdHomes,
      pageTitle: "Host homes list",
      currentPage: "host-homes",
    });
  });
};


