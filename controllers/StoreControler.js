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
  Favourite.getFavourites((favouriteIds) => {
    Home.fetchAll((registerdHomes) => {
      const favouriteHomes = registerdHomes.filter((home) =>
        favouriteIds.includes(home.id)
      );
      res.render("store/favourite-list", {
        registerdHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
      });
    });
  });
};

exports.postRemoveFromFavourite = (req, res) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId, error => {
    if (error) {
      console.log("Error while removing favourite: ", error);
    }
    res.redirect("/favourites");
  });
}

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

exports.postAddToFavourite = (req, res, next) => {
  Favourite.addToFavourite(req.body.id, error => {
    if (error) {
      console.log("Error while marking favourite: ", error);
    }
    res.redirect("/favourites");
  })
}
