/*
 * model/album
 * https://github.com/draeton/perfreqs
 *
 * Copyright (c) 2013 draeton
 * Licensed under the MIT license.
 */

"use strict";

var mongoose = require("../mongoose.js");

module.exports = (function() {

	var schema = mongoose.Schema({
		artist: String,
		album: String,
		year: Number,
		timestamp: Number,
		up: Number,
		down: Number
	});

	var Album = mongoose.model("Album", schema);

	return Album;

}());