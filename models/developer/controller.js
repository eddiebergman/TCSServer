//===================================================
// Modules
//===================================================
var EventEmitter = require('events').EventEmitter;

//===================================================
// Models
//===================================================
var Developer         = require('./model');

//===================================================
// Endpoints
//===================================================

var controller = {};
var events = new EventEmitter();
controller.events = events;

/**
 * COMNTROLLER END POINTS GO HERE
 */

//===================================================
// Exports
//===================================================
module.exports = controller;
