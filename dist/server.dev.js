"use strict";

require('dotenv').config();

var express = require('express');

var app = express();
var PORT = process.env.PORT || 3000;

var path = require('path');

var cors = require('cors');

app.use(express["static"]('public'));

var connectDB = require('./config/db');

connectDB(); // CORS

var corsOptions = {
  origin: process.env.ALLOWED_CLIENTS.split(',')
};
app.use(cors(corsOptions));
app.use(express.json()); // Template engines

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs'); // Routes 

app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));
app.listen(PORT, console.log("Listening on port ".concat(PORT, ".")));
//# sourceMappingURL=server.dev.js.map
