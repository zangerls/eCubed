//Required npm packages and scripts
const express = require('express');
const router = require('./router');
const value = require('./value');

//Initialize Express.js
let app = express();

//Set View Engine and Static Files
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(express.static('public/images'));
app.use(express.static('public/stylesheets'));
app.use(express.static('public/scripts'));

//Landing Page
app.get('/', router.startPage);

//Dashboards
app.get('/level', router.dashLevelPage);
app.get('/temperature', router.dashTempPage);
app.get('/distance', router.dashDistPage);
app.get('/misc', router.dashMiscPage);

//Charts
app.get('/loadlevel', value.sendLevels);
app.get('/loadtemp', value.sendTemperatures);
app.get('/loaddist', value.sendDistances);
app.get('/loadmisc', value.sendBattery);

//Warning Page
app.get('/warnings', router.warningPage);

//Contact Page
app.get('/contact', router.contactPage);

//Define Server Port
app.listen(12345, () => {
   console.log('Server Started!');
});