/*
 * Start the web service
 */

"use strict";

var perfreqs = require("./lib/perfreqs");
var pr = perfreqs();

pr.start();