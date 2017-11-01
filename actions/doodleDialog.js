'use strict';

var config = require('../config');
var util = require('util');

module.exports = function (session) {
	session.sendTyping();
	session.send(config.link.doodle);
	session.endDialog();
}