var restify = require('restify');
var builder = require('botbuilder');
var cron = require('cron');
var util = require('util');
var config = require('./config');

// Setup restify server
var server = restify.createServer();

server.get(/.*/, restify.plugins.serveStatic({
	'directory': '.',
	'default': 'index.html'
}));

server.listen(process.env.port || process.env.PORT || 3978, function () {
  console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the bot framework service
var connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users
server.post('/api/messages', connector.listen());

var bot = new builder.UniversalBot(connector);

bot.dialog('/', function (session, args) {

  var dailyReminder = new cron.CronJob('00 00 10 * * 1-5', function () {
    session.send(config.messages.doodle);
  }, null, true, config.timeZone);

  var trainingReminder = new cron.CronJob('00 00 10 * * TUE,THU', function () {
    session.send(config.messages.training);
  }, null, true, config.timeZone);
});

bot.customAction({
  matches: /dudli link/i,
  onSelectAction: (session, args, next) => {
    session.send(config.link.doodle);
  }
});

bot.customAction({
  matches: /(hello|hi|szia)(!?)/gi,
  onSelectAction: (session, args, next) => {
    session.send(util.format(config.messages.welcome, session.message.user.name));
  }
});

bot.on('conversationUpdate', function (message) {
  if (message.membersAdded && message.membersAdded.length > 0) {
    var membersAdded = message.membersAdded
      .map(function (member) {
        var isSelf = member.id === message.address.bot.id;
        return (isSelf ? message.address.bot.name : member.name) || '' + ' (Id: ' + member.id + ')';
      })
      .join(', ');

      bot.send(new builder.Message()
        .address(message.address)
        .text(util.format(config.messages.welcome, membersAdded)));
  }

  if (message.membersRemoved && message.membersRemoved.length > 0) {
    var membersRemoved = message.membersRemoved
      .map(function (member) {
        var isSelf = member.id === message.address.bot.id;
        return (isSelf ? message.address.bot.name : member.name) || '' + ' (Id: ' + member.id + ')';
      })
      .join(', ');

      bot.send(new builder.Message()
        .address(message.address)
        .text(config.messages.goodbye, membersRemoved));
  }
});
