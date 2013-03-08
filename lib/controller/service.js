/*
 * controller/service
 * https://github.com/draeton/perfreqs
 *
 * Copyright (c) 2013 draeton
 * Licensed under the MIT license.
 */

"use strict";

var express = require("express");
var AlbumModel = require("../model/album.js");

module.exports = (function() {


	var test = function () {
		return new AlbumModel({
			artist: "Alanis Morissette",
			album: "Jagged Little Pill",
			year: 1996,
			timestamp: Math.random()
		});
	};


	var ServiceController = function (app) {
		this.app = app;
		this.router = express();
		this.port = process.env.PORT || 5000;

		this.init();
	};

	ServiceController.prototype = {
		constructor: ServiceController,

		init: function () {
			this.listen();
		},

		listen: function () {
			this.router.get("/", this.onHome.bind(this));
			this.router.get("/random", this.onRandom.bind(this));
			this.router.get("/save", this.onSave.bind(this));
			this.router.use(this.onError.bind(this));

			this.router.listen(this.port, this.onListen.bind(this));
		},

		onListen: function () {
			console.log(">>> listening @ " + this.port);
		},

		onError: function (err, req, res) {
			console.log(">>> error : " , err);
		},

		onHome: function (req, res) {
			res.send("http://perfect-albums.herokuapp.com/")
		},

		onSave: function (req, res) {
			var album = test();

			this.app.save(album, function () {
				var response = {
					action: "save",
					data: album
				};

				res.send(JSON.stringify(response));
			});
		},

		onRandom: function (req, res) {
			this.app.random(AlbumModel, function (err, albums) {
				var response = {
					action: "random",
					data: albums
				};

				res.send(JSON.stringify(response));
			});
		}
	};

	return ServiceController;

}());