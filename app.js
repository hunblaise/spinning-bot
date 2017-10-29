'use strict';

var bot = require('./bot');
var greeter = require('./actions/greeter');

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
