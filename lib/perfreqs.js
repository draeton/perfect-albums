/*
 * perfreqs
 * https://github.com/draeton/perfreqs
 *
 * Copyright (c) 2013 draeton
 * Licensed under the MIT license.
 */

"use strict";

var express = require("express");
//var redis = require("redis");

module.exports = (function() {

	var PerfReqs = function (port) {
		this.port = port || process.env.PORT || 5000;
		this.app = express();
		this.active = false;
		//this.db = redis.createClient();
	};

	PerfReqs.prototype = {
		constructor: PerfReqs,

		status: function () {
			return this.active ? "on" : "off";
		},

		start: function () {
			this.active = this.bind();
		},

		bind: function () {
			this.app.get("/", this.onRandom.bind(this));
			this.app.get("/random", this.onRandom.bind(this));
			this.app.use(this.onError.bind(this));
			this.app.listen(this.port, this.onListen.bind(this));

			return true;
		},

		onRandom: function (req, res) {
			res.send("Here's a random album!");
		},

		onListen: function () {
			console.log("Listening on " + this.port);
		},

		onError: function (err, req, res) {
			res.status(500);
			res.render("error", {
				error: err
			});
		}
	};

	return function (port) {
		return new PerfReqs(port);
	};

}());
