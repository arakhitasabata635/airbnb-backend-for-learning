//external modules
const express = require("express");
const storeRouters = express.Router();

//local modules
const storeControllers = require("../controllers/StoreControler");

storeRouters.get("/", storeControllers.getIndex);
storeRouters.get("/homes", storeControllers.getHomes);
storeRouters.get("/bookings", storeControllers.getBookings);
storeRouters.get("/favourites", storeControllers.getFavouriteList);


module.exports = storeRouters;
