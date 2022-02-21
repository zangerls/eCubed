//Required npm packages and scripts
const value = require('./value');
const warnings = require('./warning');

//Load Landing Page with necessary data
async function startPage(req, res) {
    let data = await value.runHomeFunctions();
    res.render('index', data);
}

//Load Level-Dashboard with necessary data
async function dashLevelPage(req, res) {
    let data = await value.runLevelDashboardFunctions();
    res.render('dashboardLevel', data);
}

//Load Temperature-Dashboard with necessary data
async function dashTempPage(req, res) {
    let data = await value.runDashboardTemperatureFunctions();
    res.render('dashboardTemperature', data);
}

//Load Distance-Dashboard with necessary data
async function dashDistPage(req, res) {
    let data = await value.runDistanceDashboardFunctions();
    res.render('dashboardDistance', data);
}

//Load Miscellaneous-Dashboard with necessary data
async function dashMiscPage(req, res) {
    let data = await value.runMiscDashboardFunctions();
    res.render('dashboardMisc', data);
}

//Load Warning Page with necessary data
async function warningPage(req, res) {
    let data = await warnings.runAllWarningsFunctions();
    res.render('warnings', data);
}

//Load Contact Page with necessary data
function contactPage(req, res) {
    res.render('contact');
}

//Export Functions
exports.startPage = startPage;
exports.contactPage = contactPage;
exports.dashLevelPage = dashLevelPage;
exports.dashTempPage = dashTempPage;
exports.dashDistPage = dashDistPage;
exports.dashMiscPage = dashMiscPage;
exports.warningPage = warningPage;