const mongodb=require("mongodb");
const MongoClient = mongodb.MongoClient;

const MONGO_URL =
  "mongodb+srv://root:root@airbnb.ziazdyk.mongodb.net/?retryWrites=true&w=majority&appName=airbnb";


  let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
    .then((client) => {
      callback();
      _db = client.db('airbnb');
    })
    .catch((err) => {
      console.log("error while connecting to database", err);
    });
};

const getDb = () => {
  if (!_db) {
    throw new Error("No database found!");
  }
    return _db;
  }

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
