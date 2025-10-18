const Favourite = require("../models/favourite");
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
  Home.findById(homeId, (home) => {
    if (!home) {
      res.redirect("/homes");
    } else {
      res.render("store/home-details", {
        home: home,
        pageTitle: "Home Details",
        currentPage: "home",
      });
    }
  });
};

exports.postAddToFavourite = (req, res) => {
  const homeId = req.body.id;
  Favourite.addToFavourite(homeId, (err) => {
    if (err) {
      console.log("Error while marking favourites: ", err);
    }
    res.redirect("/favourites");
  });
};
