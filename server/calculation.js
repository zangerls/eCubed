//Required npm packages and scripts
const value = require('./value');

//Get hourly levels
async function getValues() {
    try {
        let allValues = await value.getHourlyLevels();
        let values = [];

        for (let i = 0; i < 12 ; i++) {
            values.push(allValues[i]);
        }
        return values;
    }
    catch (err) {
        console.log("No data received!");
    }
}

//Calculate each individual loss and add them
async function getAllLosses() {
    let values = await getValues();
    let eachLoss = [];
    let sumLoss = 0;

    for (let i = 0; i < (values.length - 1); i++) {
        eachLoss[i] = (values[(values.length - 1) -i] - values[(values.length - 2) -i]).toFixed(2);
        sumLoss = sumLoss + Math.abs(eachLoss[i]);
    }
    return sumLoss;
}

//Calculate average loss
async function calculateAverageLosses() {
    let avgLoss = 0;
    let sumLoss = await getAllLosses();

    avgLoss = sumLoss / 11;

    return avgLoss.toFixed(2);
}

//Calculate expected remaining days until minimum is exceeded
async function calculateRemainingDays() {
    let values = await getValues();
    let todaysLevel = values[0];
    let avgLoss = await calculateAverageLosses();
    let daysUntilMin = 0;
    let minimum = 20;

    while (todaysLevel > minimum) {
        todaysLevel = todaysLevel - avgLoss;
        daysUntilMin++;
    }
    return daysUntilMin;
}

//Export Functions
exports.calculateRemainingDays = calculateRemainingDays;
exports.calculateAverageLosses = calculateAverageLosses;