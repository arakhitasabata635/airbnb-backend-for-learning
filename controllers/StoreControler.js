const Home = require("../models/home");
const User = require("../models/user");

exports.getIndex = (req, res) => {
  Home.find().then((registerdHomes) => {
    res.render("store/index", {
      registerdHomes: registerdHomes,
      pageTitle: "airbnb home",
      currentPage: "index",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getHomes = (req, res) => {
  Home.find().then((registerdHomes) => {
    res.render("store/home-list", {
      registerdHomes: registerdHomes,
      pageTitle: "homes list",
      currentPage: "home",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getBookings = (req, res) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.getFavouriteList = async (req, res) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate("favourites");
  res.render("store/favourite-list", {
    registerdHomes: user.favourites,
    pageTitle: "My Favourites",
    currentPage: "favourites",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.postRemoveFromFavourite = async(req, res) => {
  const homeId = req.params.homeId;
  Favourite.findOneAndDelete({ houseId: homeId })
    .then((result) => {
      console.log("fav removed:", result);
    })
    .catch((err) => {
      console.log("error while removing fav:", err);
    })
    .finally(() => {
      res.redirect("/favourites");
    });
};

exports.getHomeDetails = (req, res) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then((home) => {
    if (!home) {
      res.redirect("/homes");
    } else {
      res.render("store/home-details", {
        home: home,
        pageTitle: "Home Details",
        currentPage: "home",
        isLoggedIn: req.isLoggedIn,
        user: req.session.user,
      });
    }
  });
};

exports.postAddToFavourite = async (req, res, next) => {
  const homeId = req.body.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (!user.favourites.includes(homeId)) {
    user.favourites.push(homeId);
    await user.save();
  }
  res.redirect("/favourites");
};
