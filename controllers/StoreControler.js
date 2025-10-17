const Home = require("../models/home");

exports.getIndex = (req, res) => {
  Home.fetchAll((registerdHomes) => {
    res.render("store/index", {
      registerdHomes: registerdHomes,
      pageTitle: "airbnb home",
      currentPage: "index",
    });
  });
};

exports.getHomes = (req, res) => {
   Home.fetchAll((registerdHomes) => {
    res.render("store/home-list", {
      registerdHomes: registerdHomes,
      pageTitle: "homes list",
      currentPage: "home",
    });
  });
};

exports.getBookings = (req, res) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  });
};

exports.getFavouriteList = (req, res) => {
  Home.fetchAll((registerdHomes) => {
    res.render("store/favourite-list", {
      registerdHomes: registerdHomes,
      pageTitle: "My Favourites",
    currentPage: "favourites",
    });
  });
};

exports.getHomeDetails = (req, res) => {
  const homeId = req.params.homeId;
  console.log(homeId);
   res.render("store/home-details", {
      pageTitle: "Home Details",
    currentPage: "home",
    });
};