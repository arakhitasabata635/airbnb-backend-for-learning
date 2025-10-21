const Home = require("../models/home");

exports.getAddHome = (req, res) => {
  res.render("host/edit-home", {
    pageTitle: "add home to airbnb",
    currentPage: "add-home",
    editing: false,
  });
};
exports.getEditHome = (req, res) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  Home.findById(homeId, (home) => {
    if (!home) {
      return res.redirect("/host/host-home-list");
    }
    console.log(home, editing);
    res.render("host/edit-home", {
      home: home,
      pageTitle: "Edit your home",
      currentPage: "host-homes",
      editing: editing,
    });
  });
};

exports.postAddHome = (req, res) => {
  const { houseName, price, location, rating, image } = req.body;
  const home = new Home(houseName, price, location, rating, image);
  home.save();
  res.redirect("/host/host-home-list");
};
exports.postEditHome = (req, res) => {
  const { id, houseName, price, location, rating, image } = req.body;
  const home = new Home(houseName, price, location, rating, image);
  home.id = id;
  home.save();
  res.redirect("/host/host-home-list");
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
exports.postDeleteHome = (req, res) => {
  const homeId = req.params.homeId;
  console.log(homeId);
  Home.deleteById(homeId, (error) => {
    if(error){
      console.log("Error deleting home:", error);
    };
    res.redirect("/host/host-home-list");
  });
};
