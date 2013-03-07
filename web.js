/*
 * Start the web service
 */

"use strict";

//var perfreqs = require("./lib/perfreqs");
//var pr = perfreqs();

//pr.start();

var express = require('express');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  response.send('Hello World!');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});