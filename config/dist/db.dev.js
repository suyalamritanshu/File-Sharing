"use strict";

require('dotenv').config();

var mongoose = require('mongoose');

function connectDB() {
  //Database connection
  mongoose.connect(process.env.MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  });
  var connection = mongoose.connection;
  connection.once('open', function () {
    console.log('Database connected 🥳🥳🥳🥳');
  })["catch"](function (err) {
    console.log('Connection failed ☹️☹️☹️☹️');
  });
}

module.exports = connectDB;
//# sourceMappingURL=db.dev.js.map
