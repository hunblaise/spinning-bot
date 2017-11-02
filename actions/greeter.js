'use strict';

var builder = require('botbuilder');
var config = require('../config');
var util = require('util');
var winston = require('winston');


var greetOnUpdate = function (bot, message) {
	// say hello
	winston.info('operation=greetOnUpdate', {
		membersAdded: message.membersAdded,
		membersRemoved: message.membersRemoved
	});
	if (message.membersAdded && message.membersAdded.length > 0) {
		var membersAdded = message.membersAdded.map(function (member) {
			var isSelf = member.id === message.address.bot.id;
			return isSelf ? message.address.bot.name : member.name;
		}).join(', ');

		bot.send(new builder.Message()
			.address(message.address)
			.text(util.format(config.messages.welcome, membersAdded)));
	}

	// say goodbye
	if (message.membersRemoved && message.membersRemoved.length > 0) {
		var membersRemoved = message.membersRemoved.map(function (member) {
			var isSelf = member.id === message.address.bot.id;
			return isSelf ? message.address.bot.name : member.name;
		}).join(', ');

		bot.send(new builder.Message()
			.address(message.address)
			.text(config.messages.goodbye));
	}
};

module.exports.greetOnUpdate = greetOnUpdate;
