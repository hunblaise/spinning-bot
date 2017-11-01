'use strict';

var cron = require('cron');
var util = require('util');
var builder = require('botbuilder');
var config = require('../config');

var dailyReminder;
var trainingReminder;

var prepareReminders = function (address, bot) {
	var message = new builder.Message().address(address);
	dailyReminder = new cron.CronJob(config.cron.dailyReminderPattern, function () {
		message.text(config.messages.doodle);
		bot.send(message);
  }, null, false, config.timeZone);

  trainingReminder = new cron.CronJob(config.cron.trainingReminderPattern, function () {
    message.text(config.messages.training);
    bot.send(message);
  }, null, false, config.timeZone);
};

var startReminders = function () {
	if (!dailyReminder.running) {
		dailyReminder.start();
	}
	if (!trainingReminder.running) {
		trainingReminder.start();
	}
};

module.exports = {
	prepareReminders: prepareReminders,
	startReminders: startReminders
};