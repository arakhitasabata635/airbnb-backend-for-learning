//core model
const fs = require("fs");
const path = require("path");
//local module
const rootDir = require("../utils/pathUtil");

const homeDataPath = path.join(rootDir, "data", "homes.json");
module.exports = class Home {
  constructor(houseName, price, location, rating, image) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.image = image;
  }
  save() {
    Home.fetchAll((registerdHomes) => {
      if (this.id) {
        registerdHomes = registerdHomes.map((home) =>
          home.id === this.id ? this : home
        );
      } else {
        this.id = Math.random().toString();
        registerdHomes.push(this);
      }

      fs.writeFileSync(
        homeDataPath,
        JSON.stringify(registerdHomes),
        (error) => {
          console.log("file writing concluded", error);
        }
      );
    });
  }

  static fetchAll(callBack) {
    const homeDataPath = path.join(rootDir, "data", "homes.json");
    fs.readFile(homeDataPath, (error, data) => {
      callBack(!error ? JSON.parse(data) : []);
    });
  }

  static findById(homeId, callBack) {
    Home.fetchAll((registerdHomes) => {
      const homeFound = registerdHomes.find((home) => home.id === homeId);
      callBack(homeFound);
    });
  }

  static deleteById(homeId, callBack) {
    Home.fetchAll((homes) => {
      homes = homes.filter((home) => home.id !== homeId);
      fs.writeFile(homeDataPath, JSON.stringify(homes), callBack);
    });
  }
};
