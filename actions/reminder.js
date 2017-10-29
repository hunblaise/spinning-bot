'use strict';

var cron = require('cron');
var util = require('util');
var config = require('../config');

module.exports = function (session) {
	log('before the daily reminder pattern.');
	var dailyReminder = new cron.CronJob(config.cron.testReminderPattern, function () {
		log('inside the daily remoi');
		session.send(config.messages.doodle);
  }, null, true, config.timeZone);

  var trainingReminder = new cron.CronJob(config.cron.trainingReminderPattern, function () {
    session.send(config.messages.training);
  }, null, true, config.timeZone);
}