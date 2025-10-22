const db = require("../utils/databaseUtill");

module.exports = class Home {
  constructor(houseName, price, location, rating, image, description, id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.image = image;
    this.description = description;
    this.id = id;
  }
  save() {
    if (this.id) { //update
      return db.execute(
        "UPDATE homes SET houseName = ?, price = ?, location = ?, rating = ?, image = ?, description = ? WHERE id = ?",
        [
          this.houseName,
          this.price,
          this.location,
          this.rating,
          this.image,
          this.description,
          this.id,
        ]
      );
    } else { //insert
      return db.execute(
        "INSERT INTO homes (houseName, price, location, rating, image, description) VALUES (?,?,?,?,?,?)",
        [
          this.houseName,
          this.price,
          this.location,
          this.rating,
          this.image,
          this.description,
        ]
      );
    }
  }

  static fetchAll() {
    return db.execute("SELECT * FROM homes");
  }

  static findById(homeId) {
    return db.execute("SELECT * FROM homes WHERE id = ?", [homeId]);
  }

  static deleteById(homeId) {
    return db.execute("DELETE FROM homes WHERE id = ?", [homeId]);
  }
};
