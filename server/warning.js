//Required npm packages and scripts
const value = require('./value');

//Create JSON Object for Handlebars (Level and Temperature Warnings)
async function runAllWarningsFunctions() {
    let warningsTemperature = await findTemperatureWarnings();
    let warningsLevel = await findLevelWarnings();

    let wObject = {
        tempValues: warningsTemperature,
        levelValues: warningsLevel,
    }
    return wObject;
}

//Convert all timestamps to new format
async function convertTimestamps() {
    let timestamps = await value.getHourlyTimestamps();
    let finalTime = [];

    /* THE NETILION CLOUD STORES DATES IN THE FOLLOWING FORMAT: 2021-03-01T12:00:00Z.
    TO MAKE THE TIMESTAMPS MORE EASILY READABLE AND AESTHETICALLY MORE PLEASING, WE
    PICK THE TIMESTAMP APART AND CREATE OUR OWN */

    for (let i = 0; i < 24*7; i++) {
        let year = timestamps[i].substr(2,2);
        let month = timestamps[i].substr(5,2);
        let day = timestamps[i].substr(8,2);
        let hourAndMin = timestamps[i].substr(11,5);

        let finalTimestamp = day + '/' +month + '/' +year +' @ ' + hourAndMin;
        finalTime.push(finalTimestamp);
    }
    return finalTime;
}

//Find all temperatures that exceed the max- and minimums
async function findTemperatureWarnings() {
    let topTemperature = 35;
    let lowTemperature = 15;
    let temperatures = await value.getHourlyTemperatures();
    let temperatureWarnings = [];
    let fullString;
    let finalTime = await convertTimestamps();

    //Creates string with the dangerous temperature and the corresponding timestamp
    for (let i = 0; i < 24*7; i++) {
        if (temperatures[i] >= topTemperature || temperatures[i] <= lowTemperature) {
            fullString = finalTime[i] + ' eCubed Cause: Dangerous Temperature, [' +temperatures[i] +'°C]';
            temperatureWarnings.push(fullString);
        }
    }

    //If there is no warning within the warnings array, instead of displaying nothing, the user is
    //notified that there are currently no warnings.
    if (temperatureWarnings.length === 0) {
        return ["No Warnings"];
    }
    else {
        return temperatureWarnings;
    }
}

//Find all levels that exceed the minimum
async function findLevelWarnings() {
    let minLevel = 20;
    let levels = await value.getHourlyLevels();
    let levelWarnings = [];
    let fullString;
    let finalTime = await convertTimestamps();

    //Creates string with the dangerous level and the corresponding timestamp
    for (let i = 0; i < 24*7; i++) {
        if (levels[i] <= minLevel) {
            fullString = finalTime[i] + ' eCubed Cause: Minimum Reached, [' +levels[i] +' Percent]';
            levelWarnings.push(fullString);
        }
    }

    //If there is no warning within the warnings array, instead of displaying nothing, the user is
    //notified that there are currently no warnings.
    if (levelWarnings.length === 0) {
        return ["No Warnings"]
    }
    else {
        return levelWarnings;
    }
}

//Export Functions
exports.runAllWarningsFunctions = runAllWarningsFunctions;