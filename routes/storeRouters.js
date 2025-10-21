//external modules
const express = require("express");
const storeRouters = express.Router();

//local modules
const storeControllers = require("../controllers/StoreControler");

storeRouters.get("/", storeControllers.getIndex);
storeRouters.get("/homes", storeControllers.getHomes);
storeRouters.get("/bookings", storeControllers.getBookings);
storeRouters.get("/favourites", storeControllers.getFavouriteList);
storeRouters.get("/homes/:homeId", storeControllers.getHomeDetails);
storeRouters.post("/favourites", storeControllers.postAddToFavourite);
storeRouters.post("/favourites/delete/:homeId", storeControllers.postRemoveFromFavourite);


module.exports = storeRouters;
