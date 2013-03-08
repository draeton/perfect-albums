/*
 * mongoose
 * https://github.com/draeton/perfreqs
 *
 * Copyright (c) 2013 draeton
 * Licensed under the MIT license.
 */

"use strict";

var mongoose = require("mongoose");
var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || "mongodb://localhost/mydb";

module.exports = (function () {

	mongoose.connect(mongoUri);

	mongoose.connection.once("open", function () {
		console.log(">>> connection open @ " + mongoUri);
	});

	return mongoose;

}());