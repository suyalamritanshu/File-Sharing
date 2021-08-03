"use strict";

require('dotenv').config();

var express = require('express');

var app = express();
var PORT = process.env.PORT || 3000;

var path = require('path');

app.use(express["static"]('public'));

var connectDB = require('./config/db');

connectDB();
app.use(express.json());
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs'); // Routes 

app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));
app.listen(PORT, console.log("Listening on port ".concat(PORT, ".")));
//# sourceMappingURL=server.dev.js.map
