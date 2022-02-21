//Required npm packages and scripts
const axios = require('axios');
const value = require('../value');
const calc = require('../calculation');

//Initialize Telegram specific data for the bot (Bot Token and Group Chat ID)
const token = 'YOUR_TOKEN';
const chatID = 'YOUR_ID';

//Send current status via Telegram Bot
async function sendStatus() {
    let response = await value.setAssetStatus();

    if (response === 'Your asset is currently active!') {
        let url = 'https://api.telegram.org/bot' + token +'/sendMessage?chat_id=' +chatID +'&text=' +response +'.';
        await axios.get(url);
    }
    else {
        let fail = 'The asset is currently inactive!';
        let url = 'https://api.telegram.org/bot' + token +'/sendMessage?chat_id=' +chatID +'&text=' +fail +'.';
        await axios.get(url);
    }
}

//Send current level via Telegram Bot
async function sendLevelMsg(level) {
    let response = await value.getCurrentLevel();
    let msg = 'The asset is currently measuring a level of ' +response;
    let url = 'https://api.telegram.org/bot' + token +'/sendMessage?chat_id=' +chatID +'&text=' +msg +'.';
    axios.get(url);
}


//Send estimated days until the minimum level is reached
async function sendDaysToMin() {
    let response = await calc.calculateRemainingDays();
    let msg = 'There are approximately ' +response +' days left before the minimum is reached.';
    let url = 'https://api.telegram.org/bot' + token +'/sendMessage?chat_id=' +chatID +'&text=' +msg +'.';
    axios.get(url);
}

//Send current temperature via Telegram Bot
async function sendTemperature() {
    let responseArray = await value.getHourlyTemperatures();
    let response = await responseArray[0];
    let msg = 'The asset is currently measuring a temperature of ' +response;
    let url = 'https://api.telegram.org/bot' + token +'/sendMessage?chat_id=' +chatID +'&text=' +msg +'.';
    await axios.get(url);
}

//Send link to the temperature dashboard
async function sendTemperatureDashboardLink() {
    let response = 'http://localhost:12345/temperature';
    let msg = 'Take a look at the temperature dashboard. Here is the link: ' +response;
    let url = 'https://api.telegram.org/bot' + token +'/sendMessage?chat_id=' +chatID +'&text=' +msg +'.';
    await axios.get(url);
}

//Send current distance via Telegram Bot
async function sendDistance() {
    let response = await value.getCurrentDistance();
    let msg = 'The asset is currently measuring a distance of ' +response;
    let url = 'https://api.telegram.org/bot' + token +'/sendMessage?chat_id=' +chatID +'&text=' +msg +'.';
    await axios.get(url);
}
//Export Functions
exports.sendStatus = sendStatus;
exports.sendLevelMsg = sendLevelMsg;
exports.sendDaysToMin = sendDaysToMin;
exports.sendTemperature = sendTemperature;
exports.sendTemperatureDashboardLink = sendTemperatureDashboardLink;
exports.sendDistance = sendDistance;
