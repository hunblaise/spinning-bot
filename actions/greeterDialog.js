'use strict';

var config = require('../config');
var util = require('util');
var winston = require('winston');

module.exports = function (session) {
	winston.info('operation=welcome');
	session.sendTyping();
	session.send(util.format(config.messages.welcome, session.message.user.name));
	session.endDialog();
}