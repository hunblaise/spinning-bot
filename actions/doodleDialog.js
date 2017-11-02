'use strict';

var config = require('../config');
var util = require('util');
var winston = require('winston');

module.exports = function (session) {
	winston.info('operation=doodle');
	session.sendTyping();
	session.send(config.link.doodle);
	session.endDialog();
}