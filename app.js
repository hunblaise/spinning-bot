'use strict';

var bot = require('./bot');
var greeter = require('./actions/greeter');
var reminder = require('./actions/reminder');

var savedAddress;
bot.dialog('/', function (session) {
  savedAddress = session.message.address;
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

bot.on('contactRelationUpdate', function (message) {
  savedAddress = message.address;
  reminder.prepareReminders(savedAddress, bot);
  reminder.startReminders();
});
