require("dotenv").config();
var mongoose = require("mongoose");

function connectDB() {
  // DB Connection
  var DB_USER = process.env.DB_USER;
  var DB_PASSWORD = process.env.DB_PASSWORD;
  var DB_HOST = process.env.DB_HOST;
  var DB_NAME = process.env.DB_NAME;

  var DB_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

  mongoose
    .connect(DB_URL, { retryWrites: true, w: "majority" })
    .then(() => {
      console.log("Connected Successful");
    })
    .catch((err) => console.log(err));
}

function closeDB() {
  return mongoose.connection
    .close()
    .then(() => console.log("Disconnected from database"))
    .catch((err) => console.log(err));
}

module.exports = { connectDB, closeDB };
