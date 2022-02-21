//<editor-fold desc="GLOBAL VARIABLES">
//Required npm packages and scripts
const fetch = require('node-fetch');
const axios = require('axios');
const calc = require('./calculation');

//Initialize Headers for the Netilion API
const key = 'YOUR_API_KEY';
const accept = 'application/json';
const authO = 'YOUR_AUTH';

//Initialize OpenWeatherMap data for the API
const wKey = 'YOUR_API_KEY';
const city = 'Vienna';
//</editor-fold>


//<editor-fold desc="FUNCTIONS FOR LOADING THE WEBPAGES">
//Create JSON Object for Handlebars (Landing Page)
async function runHomeFunctions() {
    let level = await getCurrentLevel();
    let distance = await getCurrentDistance();
    let temperature = await getCurrentTemperature();
    let status = await setAssetStatus();
    let outsideTemperature = await getWeatherAtLocation();

    let hObject = {
        hLevel: level,
        hDistance: distance,
        hTemperature: temperature,
        hAssetStatus: status,
        hOutTemp: outsideTemperature,
    }
    return hObject;
}

//Create JSON Object for Handlebars (Temperature-Dashboard)
async function runTemperatureDashboardFunctions() {
    let averageTemperature = await getAverageTemperature();
    let averageDeviation = await averageTemperatureDeviation();
    let lastSeen = await getLatestTimestamp();
    let status = await setDashboardAssetStatus();

    let tempExtremes = await temperatureHighsAndLows();
    let weeklyHigh =  tempExtremes[0] +"° Celsius";
    let weeklyLow =  tempExtremes[1] +"° Celsius";
    let dailyHigh =  tempExtremes[2] +"° Celsius";
    let dailyLow =  tempExtremes[3] +"° Celsius";

    tempObject = {
        tAvgTemp: averageTemperature,
        tDeviation: averageDeviation,
        tLastSeen: lastSeen,
        tStatus: status,
        tWeeklyHigh: weeklyHigh,
        tWeeklyLow: weeklyLow,
        tDailyHigh: dailyHigh,
        tDailyLow: dailyLow,
    }
    return tempObject;
}

//Create JSON Object for Handlebars (Level-Dashboard)
async function runLevelDashboardFunctions() {
    let averageLoss = await calc.calculateAverageLosses();
    let daysToMinimum = await calc.calculateRemainingDays();
    let lastSeen = await getLatestTimestamp();
    let status = await setDashboardAssetStatus();
    let cLevel = await getCurrentLevel();

    let levelExtremes = await levelHighsAndLows();
    let weeklyHigh =  levelExtremes[0] +" Percent";
    let weeklyLow =  levelExtremes[1] +" Percent";
    let dailyHigh =  levelExtremes[2] +" Percent";
    let dailyLow =  levelExtremes[3] +" Percent";

    levelObject = {
        lAvgLoss: averageLoss,
        lDays: daysToMinimum,
        lSeen: lastSeen,
        lStatus: status,
        lCurrent: cLevel,
        lWeeklyHigh: weeklyHigh,
        lWeeklyLow: weeklyLow,
        lDailyHigh: dailyHigh,
        lDailyLow: dailyLow
    }
    return levelObject;
}

//Create JSON Object for Handlebars (Distance-Dashboard)
async function runDistanceDashboardFunctions() {
    let averageLoss = await calc.calculateAverageLosses();
    let daysToMinimum = await calc.calculateRemainingDays();
    let lastSeen = await getLatestTimestamp();
    let status = await setDashboardAssetStatus();

    let distExtremes = await distanceHighsAndLows();
    let weeklyHigh =  distExtremes[0] +" Millimeters";
    let weeklyLow =  distExtremes[1] +" Millimeters";
    let dailyHigh =  distExtremes[2] +" Millimeters";
    let dailyLow =  distExtremes[3] +" Millimeters";

    distanceObject = {
        dAvgLoss: averageLoss +" Percent",
        dDays: daysToMinimum,
        dSeen: lastSeen,
        dStatus: status,

        dWeeklyHigh: weeklyHigh,
        dWeeklyLow: weeklyLow,
        dDailyHigh: dailyHigh,
        dDailyLow: dailyLow
    }
    return distanceObject;
}

//Create JSON Object for Handlebars (Miscellaneous-Dashboard)
async function runMiscDashboardFunctions() {
    let battery = await batteryLevel();
    let signal = await signalQuality();
    let status = await setDashboardAssetStatus();
    let lastSeen = await getLatestTimestamp();
    let weather = await getWeatherAtLocation();

    miscObject = {
        mBattery: battery,
        mSignal: signal,
        mStatus: status,
        mSeen: lastSeen,
        mWeather: weather
    }
    return miscObject;
}
//</editor-fold>


//<editor-fold desc="FUNCTIONS FOR THE LANDING PAGE">
//Get current distance in millimeters
async function getCurrentDistance() {
    const response = await fetch(
        'https://api.netilion.endress.com/v1/assets/85744/values?use_preferred_units=true', {
            headers: {
                'accept': accept,
                'Authorization': authO,
                'Api-Key': key
            }
        }
    )
    const data = await response.json();
    const currentDistance = await data.values[1].value;

    return currentDistance +' Millimeters';
}

//Get current level in percent
async function getCurrentLevel() {
    const response = await fetch(
        'https://api.netilion.endress.com/v1/assets/85744/values?use_preferred_units=true', {
            headers: {
                'accept': accept,
                'Authorization': authO,
                'Api-Key': key
            }
        }
    )
    const data = await response.json();
    const currentLevel = await data.values[2].value;

    return currentLevel +' Percent';
}

//Get current temperature in ° Celsius
async function getCurrentTemperature() {
    const response = await fetch(
        'https://api.netilion.endress.com/v1/assets/85744/values?use_preferred_units=true', {
            headers: {
                'accept': accept,
                'Authorization': authO,
                'Api-Key': key
            }
        }
    )
    const data = await response.json();
    const currentTemp = data.values[4].value;

    return currentTemp + '° Celsius';
}

//Get current asset status
async function setAssetStatus() {
    const response = await fetch(
        'https://api.netilion.endress.com/v1/assets/85744/status', {
            headers: {
                'accept': accept,
                'Authorization': authO,
                'Api-Key': key
            }
        }
    )
    const data = await response.json();
    const statusCode = data.code;

    if (statusCode === 'ok') {
        return 'Your asset is currently active!';
    }
    else {
        return 'Your asset is currently inactive!'
    }
}

//Get weather at the asset's location
async function getWeatherAtLocation() {
    let url = 'http://api.openweathermap.org/data/2.5/weather?q=' +city   +'&appid=' +wKey;
    let res = await axios.get(url);

    let tempInK = res.data.main.temp;
    let tempInC = tempInK - 273.15;
    tempInC = tempInC.toFixed(1);

    return tempInC + '° Celsius';
}
//</editor-fold>


//<editor-fold desc="FUNCTIONS FOR THE DASHBOARD(S)">
//Get current asset status
async function setDashboardAssetStatus() {
    const response = await fetch(
        'https://api.netilion.endress.com/v1/assets/85744/status', {
            headers: {
                'accept': accept,
                'Authorization': authO,
                'Api-Key': key
            }
        }
    )
    const data = await response.json();
    const code = data.code;

    if (code === 'ok') {
        return 'Active'
    }
    else {
        return 'Inactive'
    }
}

//Get the latest timestamp
async function getLatestTimestamp() {
    const response = await fetch(
        'https://api.netilion.endress.com/v1/assets/85744/values?use_preferred_units=true', {
            headers: {
                'accept': accept,
                'Authorization': authO,
                'Api-Key': key
            }
        }
    )
    const data = await response.json();
    const latestTimestamp = data.values[0].timestamp;

    //Format timestamp to a more readable string (DD/MM/YY @ HH:MM)
    let year = latestTimestamp.substr(2,2);
    let month = latestTimestamp.substr(5,2);
    let day = latestTimestamp.substr(8,2);
    let hourAndMin = latestTimestamp.substr(11,5);
    let finalTimestamp = day + '/' +month + '/' +year +' @ ' + hourAndMin;

    return finalTimestamp;
}

//Calculate average temperature over the last seven days
async function getAverageTemperature() {
    let hourlyTemperature = [];
    let temperatureSum = 0;
    let averageTemperature = 0;

    const response = await fetch(
        'https://api.netilion.endress.com/v1/assets/85744/values/temperature?use_preferred_units=true&order_by=-timestamp', {
            headers: {
                'accept': accept,
                'Authorization': authO,
                'Api-Key': key
            }
        }
    )
    const data = await response.json();

    for (let i = 0; i < 24*7; i++) {
        hourlyTemperature.push(data.data[i].value);
        temperatureSum = temperatureSum + hourlyTemperature[i];
    }
    averageTemperature = temperatureSum / (24*7);
    averageTemperature = averageTemperature.toFixed(1);

    return averageTemperature +'° Celsius';
}

//Calculate standard deviation of the average temperature over the last seven days
async function averageTemperatureDeviation() {
    let hourlyTemperatures = await getHourlyTemperatures();
    let averageDeviation = 0;
    let averageTemperature = await getAverageTemperature();
    let deviationSum = 0;

    let finalAverageTemperature = (averageTemperature.replace(/\D/g,'')) / 10;

    for (let i = 0; i < 7*24; i++) {
        deviationSum = deviationSum + Math.abs(finalAverageTemperature - hourlyTemperatures[i]);
    }

    averageDeviation = deviationSum / (7*24);
    averageDeviation = averageDeviation.toFixed(1);

    return averageDeviation +'° Celsius';
}

//Calculate average daily loss
async function averageDailyLoss() {
    let hourlyLevels = await getHourlyLevels();
    let lossSum = 0;
    let avg;

    for (let i = 0; i < (24); i++) {
        lossSum = lossSum + ((hourlyLevels[i+1]) - (hourlyLevels[i]));
    }
    avg = Math.abs(lossSum / (hourlyLevels.length -1)) +' Percent';

    return avg;
}

//Get current battery level of the asset
async function batteryLevel() {
    let batteryLevel;

    const response = await fetch(
        'https://api.netilion.endress.com/v1/assets/85744/values?use_preferred_units=true&key=battery', {
            headers: {
                'accept': accept,
                'Authorization': authO,
                'Api-Key': key
            }
        }
    )
    const data = await response.json();
    const battery = data.values[0].value;

    /*Battery level is not stored as a percentage in Netlion Cloud.
    However, one percent of charge is roughly 40 units of charge*/
    batteryLevel = battery / 40;
    batteryLevel = batteryLevel.toFixed(0);

    return batteryLevel + ' Percent';
}

//Get current signal quality of the asset
async function signalQuality() {
    let signalQuality = '';

    const response = await fetch(
        'https://api.netilion.endress.com/v1/assets/85744/values?use_preferred_units=true&key=signal_quality', {
            headers: {
                'accept': accept,
                'Authorization': authO,
                'Api-Key': key
            }
        }
    )
    const data = await response.json();
    const quality = data.values[0].value;

    if (quality > 150) {
        signalQuality = 'Very Strong';
    }
    if (quality >= 100 && quality < 150) {
        signalQuality = 'Strong';
    }
    if (quality >= 50 && quality < 100) {
        signalQuality = 'Weak';
    }
    if (quality < 50) {
        signalQuality = 'Very Weak';
    }
    return  signalQuality;
}
//</editor-fold>


//<editor-fold desc="FUNCTIONS FOR ARRAY DATA">
//Get hourly timestamps of each measurement by the asset over the last seven days
async function getHourlyTimestamps() {
    let dailyTimestamps = [];

    const response = await fetch(
        'https://api.netilion.endress.com/v1/assets/85744/values/distance?use_preferred_units=true&order_by=-timestamp', {
            headers: {
                'accept': accept,
                'Authorization': authO,
                'Api-Key': key
            }
        }
    )
    const data = await response.json();

    for (let i = 0; i < 24*7; i++) {
        dailyTimestamps.push(data.data[i].timestamp);
    }
    return dailyTimestamps;
}

//Get hourly distances over the last seven days
async function getHourlyDistances() {
    let hourlyDistance = [];

    const response = await fetch(
        'https://api.netilion.endress.com/v1/assets/85744/values/distance?use_preferred_units=true&order_by=-timestamp', {
            headers: {
                'accept': accept,
                'Authorization': authO,
                'Api-Key': key
            }
        }
    )
    const data = await response.json();

    for (let i = 0; i < 24*7; i++) {
        hourlyDistance.push(data.data[i].value);
    }
    return hourlyDistance;
}

//Get hourly levels over the last seven days
async function getHourlyLevels() {

    let hourlyLevels = [];

    //Fetch the latest levels
    const response = await fetch(
        'https://api.netilion.endress.com/v1/assets/85744/values/level?use_preferred_units=true&order_by=-timestamp', {
            headers: {
                'accept': accept,
                'Authorization': authO,
                'Api-Key': key
            }
        }
    )
    const data = await response.json();

    for (let i = 0; i < 24*7; i++) {
        hourlyLevels.push(data.data[i].value);
    }

    return hourlyLevels;
}

//Get hourly temperatures over the last seven days
async function getHourlyTemperatures() {
    let hourlyTemperature = [];

    const response = await fetch(
        'https://api.netilion.endress.com/v1/assets/85744/values/temperature?use_preferred_units=true&order_by=-timestamp', {
            headers: {
                'accept': accept,
                'Authorization': authO,
                'Api-Key': key
            }
        }
    )
    const data = await response.json();

    for (let i = 0; i < 24*7; i++) {
        hourlyTemperature.push(data.data[i].value);
    }

    return hourlyTemperature;
}
//</editor-fold>


//<editor-fold desc="FUNCTIONS FOR CHART.JS ">
//Get levels for the last 12 hours for the levels chart
async function sendLevels(req, res) {
    let levels = [];

    const response = await fetch(
        'https://api.netilion.endress.com/v1/assets/85744/values/level?use_preferred_units=true&order_by=-timestamp', {
            headers: {
                'accept': accept,
                'Authorization': authO,
                'Api-Key': key
            }
        }
    )
    const data = await response.json();

    for (let i = 0; i < 12; i++) {
        levels.push(data.data[i].value);
    }
    res.send(JSON.stringify(levels));
}

//Get temperatures for the last 12 hours for the temperature chart
async function sendTemperatures(req, res) {
    let temperatures = [];

    const response = await fetch(
        'https://api.netilion.endress.com/v1/assets/85744/values/temperature?use_preferred_units=true&order_by=-timestamp', {
            headers: {
                'accept': accept,
                'Authorization': authO,
                'Api-Key': key
            }
        }
    )
    const data = await response.json();

    for (let i = 0; i < 12; i++) {
        temperatures.push(data.data[i].value);
    }
    res.send(JSON.stringify(temperatures));
}

//Get distances for the last 12 hours for the distance chart
async function sendDistances(req, res) {
    let distances = [];

    const response = await fetch(
        'https://api.netilion.endress.com/v1/assets/85744/values/distance?use_preferred_units=true&order_by=-timestamp', {
            headers: {
                'accept': accept,
                'Authorization': authO,
                'Api-Key': key
            }
        }
    )
    const data = await response.json();

    for (let i = 0; i < 12; i++) {
        distances.push(data.data[i].value);
    }
    res.send(JSON.stringify(distances));
}

//Get battery level for the last 12 hours for the misc chart
async function sendBattery(req, res) {
    let battery = [];
    let weeklyBattery = [];

    const response = await fetch(
        'https://api.netilion.endress.com/v1/assets/85744/values/battery?use_preferred_units=true&order_by=-timestamp', {
            headers: {
                'accept': accept,
                'Authorization': authO,
                'Api-Key': key
            }
        }
    )
    const data = await response.json();

    for (let i = 0; i < 24*8; i++) {
        battery.push(data.data[i].value);
    }

    for (let i = 0; i < 12; i++) {
        weeklyBattery.push(battery[i*16]);
    }

    res.send(JSON.stringify(battery));
}
//</editor-fold>


//<editor-fold desc="FUNCTIONS FOR EXTREME VALUES">
//Returns weekly and daily level high and low
async function levelHighsAndLows() {
    let weeklyLevels = [];
    let dailyLevels = [];

    const response = await fetch(
        'https://api.netilion.endress.com/v1/assets/85744/values/level?use_preferred_units=true&order_by=-timestamp', {
            headers: {
                'accept': accept,
                'Authorization': authO,
                'Api-Key': key
            }
        }
    )
    const data = await response.json();

    //Create an array with the hourly levels for the last seven days
    for (let i = 0; i < 24*7; i++) {
        weeklyLevels.push(data.data[i].value);
    }

    //Shrink weekly level array down to the last 24 hours
    for (let i = 0; i < 24; i++) {
        dailyLevels.push(weeklyLevels[i]);
    }

    //Calculate weekly and daily highs and lows from the arrays
    let weeklyHigh = Math.max.apply(Math, weeklyLevels);
    let weeklyLow = Math.min.apply(Math, weeklyLevels);
    let dailyHigh = Math.max.apply(Math, dailyLevels);
    let dailyLow = Math.min.apply(Math, dailyLevels);

    let levelExtremes = [weeklyHigh, weeklyLow, dailyHigh, dailyLow];

    return levelExtremes;
}

//Returns weekly and daily temperature high and low
async function temperatureHighsAndLows() {
    let weeklyTemperature = [];
    let dailyTemperature = [];

    const response = await fetch(
        'https://api.netilion.endress.com/v1/assets/85744/values/temperature?use_preferred_units=true&order_by=-timestamp', {
            headers: {
                'accept': accept,
                'Authorization': authO,
                'Api-Key': key
            }
        }
    )
    const data = await response.json();

    //Create an array with the hourly temperatures for the last seven days
    for (let i = 0; i < 24*7; i++) {
        weeklyTemperature.push(data.data[i].value);
    }

    //Shrink weekly temperature array down to the last 24 hours
    for (let i = 0; i < 24; i++) {
        dailyTemperature.push(weeklyTemperature[i]);
    }

    //Calculate weekly and daily highs and lows from the arrays
    let weeklyHigh = Math.max.apply(Math, weeklyTemperature);
    let weeklyLow = Math.min.apply(Math, weeklyTemperature);
    let dailyHigh = Math.max.apply(Math, dailyTemperature);
    let dailyLow = Math.min.apply(Math, dailyTemperature);

    let tempExtremes = [weeklyHigh, weeklyLow, dailyHigh, dailyLow];

    return tempExtremes;
}

//Returns weekly and daily distance high and low
async function distanceHighsAndLows() {
    let weeklyDistance = [];
    let dailyDistance = [];

    const response = await fetch(
        'https://api.netilion.endress.com/v1/assets/85744/values/distance?use_preferred_units=true&order_by=-timestamp', {
            headers: {
                'accept': accept,
                'Authorization': authO,
                'Api-Key': key
            }
        }
    )
    const data = await response.json();

    //Create an array with the hourly distances for the last seven days
    for (let i = 0; i < 24*7; i++) {
        weeklyDistance.push(data.data[i].value);
    }

    //Shrink weekly distance array down to the last 24 hours
    for (let i = 0; i < 24; i++) {
        dailyDistance.push(weeklyDistance[i]);
    }

    //Calculate weekly and daily highs and lows from the arrays
    let weeklyHigh = Math.max.apply(Math, weeklyDistance);
    let weeklyLow = Math.min.apply(Math, weeklyDistance);
    let dailyHigh = Math.max.apply(Math, dailyDistance);
    let dailyLow = Math.min.apply(Math, dailyDistance);

    let distExtremes = [weeklyHigh, weeklyLow, dailyHigh, dailyLow];

    return distExtremes;
}
//</editor-fold>


//<editor-fold desc="EXPORTS OF FUNCTIONS">
//Functions for loading each page
exports.runHomeFunctions = runHomeFunctions;
exports.runDashboardTemperatureFunctions = runTemperatureDashboardFunctions;
exports.runLevelDashboardFunctions = runLevelDashboardFunctions;
exports.runDistanceDashboardFunctions = runDistanceDashboardFunctions;
exports.runMiscDashboardFunctions = runMiscDashboardFunctions;

//Functions for dashboards
exports.setAssetStatus = setAssetStatus;
exports.getCurrentLevel = getCurrentLevel;
exports.getCurrentTemperature = getCurrentTemperature;
exports.getCurrentDistance = getCurrentDistance;
exports.setDashboardAssetStatus = setDashboardAssetStatus;
exports.getHourlyLevels = getHourlyLevels;
exports.getHourlyTemperatures = getHourlyTemperatures;
exports.getHourlyTimestamps = getHourlyTimestamps;
exports.getHourlyDistances = getHourlyDistances;

//Functions for charts
exports.sendLevels = sendLevels;
exports.sendTemperatures = sendTemperatures;
exports.sendDistances = sendDistances;
exports.sendBattery = sendBattery;
//</editor-fold>
