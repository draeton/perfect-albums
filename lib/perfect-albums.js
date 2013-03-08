/*
 * perfect-albums
 * https://github.com/draeton/perfreqs
 *
 * Copyright (c) 2013 draeton
 * Licensed under the MIT license.
 */

"use strict";

var ServiceController = require("./controller/service.js");

module.exports = (function() {

	var PerfectAlbums = function () {
		this.controller = new ServiceController(this);
	};

	PerfectAlbums.prototype = {
		constructor: PerfectAlbums,

		save: function (album, callback) {
			album.save(callback);
		},

		random: function (AlbumModel, callback) {
			AlbumModel.find(callback);
		}
	};

	return PerfectAlbums;

}());