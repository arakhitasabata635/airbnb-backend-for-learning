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
    this.id=Math.random().toString();
    Home.fetchAll((registerdHomes) => {
      registerdHomes.push(this);
      fs.writeFileSync(
        homeDataPath,
        JSON.stringify(registerdHomes),
        (error) => {
          console.log(error);
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
  };
};
