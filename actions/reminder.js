'use strict';

var cron = require('cron');
var util = require('util');
var builder = require('botbuilder');
var config = require('../config');
var winston = require('winston');

var dailyReminder;
var trainingReminder;

var prepareReminders = function (address, bot) {
	winston.info('operation=prepareReminders');
	var message = new builder.Message().address(address);
	dailyReminder = new cron.CronJob(config.cron.dailyReminderPattern, function () {
		message.text(config.messages.doodle);
		bot.send(message);
  }, null, false, config.timeZone);

  trainingReminder = new cron.CronJob(config.cron.trainingReminderPattern, function () {
    message.text(config.messages.training);
    bot.send(message);
  }, null, false, config.timeZone);

  winston.debug('prepared reminders', {
  	dailyReminder: dailyReminder,
  	trainingReminder: trainingReminder
  });
};

var startReminders = function () {
	winston.info('operation=startReminders');
	if (!dailyReminder.running) {
		winston.debug('starting daily reminder');
		dailyReminder.start();
	}
	if (!trainingReminder.running) {
		winston.debug('starting training reminder');
		trainingReminder.start();
	}
};

module.exports = {
	prepareReminders: prepareReminders,
	startReminders: startReminders
};