/*
 * Start the web service
 */

"use strict";

var perfectAlbums = require("./lib/perfect-albums");

var app = perfectAlbums(function (app) {
	app.start();
});