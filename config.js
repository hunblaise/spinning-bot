module.exports = {
  link: {
    doodle: 'https://epa.ms/spin'
  },
  cron: {
    dailyReminderPattern: '00 00 11 * * 1-5',
    trainingReminderPattern: '00 00 11 * * TUE,THU',
    testReminderPattern: '* * * * * *'
  },
  timeZone: 'Europe/Budapest',
  messages: {
    welcome: 'Hi %s! (wave)',
    goodbye: 'Goodbye :(',
    doodle: 'Dudli reminder! https://epa.ms/spin',
    training: 'Today is spin day!'
  }
};
