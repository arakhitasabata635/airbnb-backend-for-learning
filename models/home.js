//core model
const fs = require("fs");
const path = require("path");
//local module
const rootDir = require("../utils/pathUtil");
const { root } = require("postcss");

// fake database
// const  registerdHomes = [
//   {
//     houseName: "Utsav",
//     price: "9999",
//     location: "Goa",
//     rating: "5",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTapw_XWWJYkuY2JzBMXZsmTWtaGHL3p60_kw&s",
//   },
//   {
//     houseName: "Seaside Villa",
//     price: "7999",
//     location: "Kerala",
//     rating: "4.8",
//     image:
//       "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
//   },
//   {
//     houseName: "Mountain Retreat",
//     price: "5999",
//     location: "Manali",
//     rating: "4.9",
//     image:
//       "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
//   },
//   {
//     houseName: "City Lights",
//     price: "8999",
//     location: "Mumbai",
//     rating: "4.7",
//     image:
//       "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80",
//   },
//   {
//     houseName: "Desert Oasis",
//     price: "6999",
//     location: "Jaisalmer",
//     rating: "4.6",
//     image:
//       "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
//   },
// ];

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
      const homeDataPath = path.join(rootDir, "data", "homes.json");
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
};
