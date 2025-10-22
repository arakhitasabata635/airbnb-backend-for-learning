const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res) => {
  Home.fetchAll().then((registerdHomes) => {
    res.render("store/index", {
      registerdHomes: registerdHomes,
      pageTitle: "airbnb home",
      currentPage: "index",
    });
  });
};

exports.getHomes = (req, res) => {
  Home.fetchAll().then((registerdHomes) => {
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
  Favourite.getFavourites().then(favouriteIds => {
    favouriteIds = favouriteIds.map((fav) => fav.houseId);

    Home.fetchAll().then((registerdHomes) => {
      const favouriteHomes = registerdHomes.filter((home) =>
        favouriteIds.includes(home._id.toString())
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
  Favourite.deleteById(homeId).then((result) => {
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
      });
    }
  });
};

exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.id;
  const fav = new Favourite(homeId);
  fav
    .save()
    .then((result) => {
      console.log("fav added:", result);
    })
    .catch((err) => {
      console.log("error while adding fav:", err);
    })
    .finally(() => {
      res.redirect("/favourites");
    });
};
