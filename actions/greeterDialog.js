'use strict';

var config = require('../config');
var util = require('util');

module.exports = function (session) {
	session.sendTyping();
	session.send(util.format(config.messages.welcome, session.message.user.name));
	session.endDialog();
}