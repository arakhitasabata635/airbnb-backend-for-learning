const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");

const favouriteDataPath = path.join(rootDir, "data", "favourite.json");

module.exports = class Favourite {
  static addToFavourite(homeId, callBack) {
    Favourite.getFavourites((favourites) => {
      if (favourites.includes(homeId)) {
        callBack("home is already marked as favourites");
      } else {
        favourites.push(homeId);
        fs.writeFileSync(favouriteDataPath,JSON.stringify(favourites),callBack);
      }
    });
  }

  static getFavourites(callBack) {
    fs.readFile(favouriteDataPath, (err, data) => {
      callBack(!err ? JSON.parse(data) : []);
    });
  }
};
