//var cron = require('cron');
//var config = require('./config');
var bot = require('./bot');
var greeter = require('./actions/greeter');

/*bot.dialog('/', function (session, args) {

  var dailyReminder = new cron.CronJob('00 00 11 * * 1-5', function () {
    session.send(config.messages.doodle);
  }, null, true, config.timeZone);

  var trainingReminder = new cron.CronJob('00 00 11 * * TUE,THU', function () {
    session.send(config.messages.training);
  }, null, true, config.timeZone);
});*/

bot.dialog('/', function (session) {
  session.send("You said: %s", session.message.text);
});

bot.dialog('doodle', require('./actions/doodleDialog'))
  .triggerAction({
    matches: [/dudli/i]
  });

bot.dialog('greeting', require('./actions/greeterDialog'))
  .triggerAction({
    matches: [/hello/i, /hi/i, /szia/i]
  });

bot.on('conversationUpdate', function (message) {
  greeter.greetOnUpdate(bot, message);
});
