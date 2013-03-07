/*
 * perfect-albums
 * https://github.com/draeton/perfreqs
 *
 * Copyright (c) 2013 draeton
 * Licensed under the MIT license.
 */

"use strict";

var express = require("express");
var mongoose = require("mongoose");
var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || "mongodb://localhost/mydb";

mongoose.connect(mongoUri);

module.exports = (function() {

	var albumSchema = mongoose.Schema({
		artist: String,
		album: String,
		year: Number,
		timestamp: Number
	});

	var Album = mongoose.model("Album", albumSchema);

	var PerfectAlbums = function (callback) {
		this.ready = false;
		this.port = process.env.PORT || 5000;
		this.onInit = callback || function () {};
		this.app = express();
		this.db = mongoose.connection;

		this.db.once("open", this.init.bind(this));
	};

	PerfectAlbums.prototype = {
		constructor: PerfectAlbums,

		init: function () {
			this.ready = true;
			this.onInit(this);
		},

		status: function () {
			return this.active ? "on" : "off";
		},

		start: function () {
			// temporarily saving an album here
			var album = new Album({
				artist: "Alanis Morissette",
				album: "Jagged Little Pill",
				year: 1996,
				timestamp: (new Date()).getTime()
			});
			album.save(function (err, album) {
				console.log(">>> saved " + album);
			});
			// temp save end

			this.listen();
		},

		listen: function () {
			this.app.get("/", this.onRandom.bind(this));
			this.app.get("/random", this.onRandom.bind(this));
			this.app.use(this.onError.bind(this));
			this.app.listen(this.port, this.onListen.bind(this));
		},

		onListen: function () {
			console.log("Listening on " + this.port);
		},

		onError: function (err, req, res) {
			res.status(500);
			res.render("error", {
				error: err
			});
		},

		onRandom: function (req, res) {
			Album.find(function (err, albums) {
				console.log(">>> " + JSON.stringify(albums));
				res.send(JSON.stringify(albums));
			});
		}
	};

	return function (callback) {
		return new PerfectAlbums(callback);
	};

}());