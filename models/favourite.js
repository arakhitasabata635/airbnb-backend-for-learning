const { getDb } = require("../utils/databaseUtill");

module.exports = class Favourite {
  constructor(houseId) {
    this.houseId = houseId;
  }
  save() {
    const Db = getDb();
    return Db.collection("favourites")
      .findOne({ houseId: this.houseId })
      .then((existingFav) => {
        if (!existingFav) {
          return Db.collection("favourites").insertOne(this);
        }
        return  Promise.resolve();
      });
  }

  static getFavourites() {
    const Db = getDb();
    return Db.collection("favourites").find().toArray();
  }
  static deleteById(delHomeId) {
    const Db = getDb();
    return Db.collection("favourites").deleteOne({ houseId: delHomeId });
  }
};
