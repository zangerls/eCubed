# eCubed - eine IIoT Sensorplattform

Dieses Repo enthält den gesamten Umfang meiner 2020/21 Diplomarbeit für meine Ausbildung zum Wirtschaftsingenieur auf der HTL Ungargasse, 1030 Wien.

Viele Abschnitte des Projektablaufs und der Entwicklung werden hier beschrieben. Sind Sie jedoch mehr an den Details interessiert, empfehle ich die [offizielle Dokumentation](https://github.com/zangerls/eCubed/blob/main/Dokumentation/eCubed%20Dokumentation.pdf) zu lesen.

### Übersicht

1. [Hardware](https://github.com/zangerls/eCubed/edit/main/README.md#1---die-hardware)
2. [Beschreibung](https://github.com/zangerls/eCubed/edit/main/README.md#2---beschreibung)
3. [Konzept](https://github.com/zangerls/eCubed/edit/main/README.md#3---konzept)
4. [UX Entwicklung](https://github.com/zangerls/eCubed/edit/main/README.md#4---ux-entwicklung)
5. [Software](https://github.com/zangerls/eCubed/edit/main/README.md#5---software)
6. [Letzte Worte](https://github.com/zangerls/eCubed/edit/main/README.md#6---letzte-worte)

## 1 - Die Hardware

Die Daten für die Applikation kommen von einem [FWR30 Micropilot](https://www.at.endress.com/de/messgeraete-fuer-die-prozesstechnik/fuellstandssensor/radar-level-micropilot-fwr30?t.tabId=product-overview) von Endress+Hauser. Der Micropilot überträgt seine Messwerte (Füllstand, Temperatur, Neigungswinkel, ..) mittels 4G Übertragungsstandard bzw. 2G Fallback in die Netilion Cloud. Innerhalb der Netilion Umgebung ist ein integriertes Dashboard vorhanden, es ist dem Nutzer aber auch möglich, mithilfe des Netilion APIs die Daten außerhalb der nativen Umgebung zu nutzen.

## 2 - Beschreibung

Das Ziel von eCubed ist es, eine Webapplikation zu entwickeln, welche es dem Nutzer ermöglicht, seine Messdaten auf jedem Gerät, sei es sein Handy, PC oder Smartwatch, jederzeit ansehen zu können.

Sämtliche Informationen werden zusätzlich in Form von interaktiven Diagrammen für einfachere Interpretation der Daten visualisiert. Ebenso werden mithilfe von selbstprogrammierten Algorithmen komplexe Berechnungen für Werte wie der Standardabweichung der Temperatur und geschätzte Tage bis zum Mindestfüllstand ermittelt.

Ein großer Teil des Projekts ist der cuBot One – unser selbstentwickelter persönlicher Assistent für die Prozessanlage des Nutzers.

Dieser unterstützt den User dabei, sein Serviceteam über gefährliche Messwerte, Ausfälle der Sensorplattform und ähnliches zu informieren, indem er entweder automatisiert oder auf Wunsch des Nutzers die angemessene Nachricht per Telegram an das Team sendet.

Zusätzlich kann cuBot One sich mit dem User unterhalten und ihm Auskünfte über seine Prozessanlage liefern. Dies geschieht, indem man einem Gerät mit Google Assistant installiert sagt, man möchte mit cuBot One reden. Diesen kann man dann mit natürlicher Sprache fragen, ob die Sensorplattform aktiv ist, welche Werte sie misst und vieles mehr, worauf er mit den passenden Informationen antwortet.

## 3 - Konzept

![Konzept](https://user-images.githubusercontent.com/66888655/158031995-a3eac408-42cc-4d01-9a33-dc5627f188b8.png)

1. Prozessanlage
2. Micropilot FWR30
3. Netilion Umgebung
4. Frontend & Backend
5. Telegram API
6. Google Assistant
7. Firebase
8. End User

### 3.1 - Ablauf

Der Micropilot FWR30 (2) misst in stündlichen Intervallen die Daten der Prozessanlage (1) und sendet sämtliche Werte an das Netilion Ökosystem (3). Diese werden dort gespeichert und über Get-Requests an unser Programm (4) gesendet. Wenn unser persönlicher Assistent cuBot One eine Telegramnachricht (5) sendet, geschieht dies über eine Get-Request mit der passenden URL innerhalb unserer Softwareumgebung (4) an unseren Server, welcher die Nachricht an das Gerät des Nutzers (8) schickt. Wenn der Nutzer (8) per Google Assistant (6) auf cuBot One zugreift, greift der Assistent auf den WebHook in Firebase (7) zu, um die passende Antwort geben zu können.

## 4 - UX Entwicklung

Die Nutzererfahrung ist ein sehr komplexes Thema, weil sie bei der Verwendung eines digitalen Produkts, jegliche Bedürfnisse eines Nutzers deckt. Unser Ziel ist es, die Erfahrung des Nutzers zu verbessern und ihm so schnell wie möglich das Erreichen des gewünschten Ziels zu gewährleisten. Nutzer sind meistens faul und verlieren das Interesse, wenn sie ihren Weg nicht finden, deswegen kümmern wir uns darum, dass unser Produkt gut zu benutzen ist.

Der Ablauf unserer Entwicklung der User Experience (Nutzungserlebnis) wurde aufgeteilt in vier Hauptkategorien. Auch diese wurden ebenfalls unterteilt, um sicherzustellen, alle Punkte zu behandeln und die UX so angenehm und intuitiv für den Nutzer zu erzeugen, da dies einer der wichtigsten Faktoren für das Projekt war.

Die Abschnittsunterteilung der User Experience Entwicklung war:
* Forschung
* Brainstorming
* Implementierung
* Berichterstattung

Einige Prototypen des User Interfaces können Sie in der [Adobe XD Datei](https://github.com/zangerls/eCubed/blob/main/Dokumentation/eCubed%20Mockups.xd) widerfinden.

## 5 - Software

### 5.1 - Übersicht

Die Applikation besteht aus drei Hauptsystemen, welche essenziell für das Gesamtprojekt sind.
* Webapplikation für den User (Front- und Backend)
* Google Assistant
* Netilion

Diese drei Komponenten erfüllen ihre Aufgaben über verschiedene Plattformen und laufen in dem Endprodukt eCubed zu einem nahtlosen Gesamtbild
zusammen.

Alle drei Bestandteile haben eine direkte Verbindung zu mindestens einem weiteren. So greift die Applikation für die Daten auf die Netilion Cloud zu. Auch der Google Assistant empfängt seine Daten von dieser.

### 5.2 - Frontend

Für das Frontend wurde die JS Template-Engine Handlebars verwendet. Hier ist ein Ausschnitt des Frontends der Homepage.
```html
<!-- FULL PAGES -->
    <section class="section level">
        <h5 class="text text-center subHeading">Current Level</h5>
        <h1 class="heading text-center display-3">{{hLevel}}</h1>
        <a href="/level"><button type="button" class="btn btn-outline-light">Check details</button></a>
    </section>

    <section class="section temperature">
        <h5 class="text text-center subHeading">Current Temperature</h5>
        <h1 class="heading text-center display-3">{{hTemperature}}</h1>
        <a href="/temperature"><button type="button" class="btn btn-outline-light">Check details</button></a>
    </section>

    <section class="section distance">
        <h5 class="text text-center subHeading">Current Distance</h5>
        <h1 class="heading text-center display-3">{{hDistance}}</h1>
        <a href="/distance"><button type="button" class="btn btn-outline-light">Check details</button></a>
    </section>

    <section class="section location">
        <h5 class="text text-center subHeading">Current Outside Temperature</h5>
        <h1 class="heading text-center display-3">{{hOutTemp}}</h1>
        <a href="/misc"><button type="button" class="btn btn-outline-light">Check details</button></a>
    </section>
```

### 5.3 - Backend

Die Applikation wurde serverseitig mit Node.js als Laufzeitumgebung für JavaScript und dem Express.js Framework als Grundlage entwickelt.

#### 5.3.1 - [index.js](https://github.com/zangerls/eCubed/tree/main/server/index.js) Preview

```js
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

...

//Define Server Port
app.listen(12345, () => {
   console.log('Server Started!');
});
```

#### 5.3.2 - [router.js](https://github.com/zangerls/eCubed/tree/main/server/router.js) Preview

Die Skriptdatei für das Rendern des Frontends und der Übertragung der nötigen Daten für den Nutzer.

```js
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

...
```

#### 5.3.3 - [value.js](https://github.com/zangerls/eCubed/tree/main/server/value.js) Preview

Die Skriptdatei für das Senden von Requests an den Netilion-Server für alle Mess- und Metadaten.

```js
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

...
```

#### 5.3.4 - [calculation.js](https://github.com/zangerls/eCubed/tree/main/server/calculation.js) Preview

Die Skriptdatei mit den Algorithmen für das Berechnen von Standardabweichungen, Durchschnittswerten und geschätzten Tagen bis zum Mindestfüllstand.

```js
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

...
```

#### 5.3.5 - [warning.js](https://github.com/zangerls/eCubed/blob/main/server/warning.js) Preview

Die Skriptdatei für das Berechnen und Überprüfen von gefährlichen Werten oder anomalien in den Messdaten.

```js
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
    
    ...
```

#### 5.3.6 - [telegram.js](https://github.com/zangerls/eCubed/blob/main/server/telegram.js) Preview

Die Skriptdatei für das Senden von Telegramnachrichten an das Serviceteam.

```js
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

...
```

### 5.4 - Google Assistant

Um die eCubed Anwendung per Google Assistant Sprachsteuerung zu bedienen wurde Google Action Console und Firebase zum Hosten verwendet.

Die Webhooks wurden in JavaScript entwickelt um auf die Messdaten der Sensorplattform zugreifen zu können und diese durch den Sprachassistenten wiederzugeben.

Beispiel für einen Event-Handler in JavaScript:

```js
const app = conversation({debug: true});
app.handle("overview", (conv) => {
 const level = await getCurrentLevel();
 const temperature = await getCurrentTemperature();

 const message = "Your asset is currently measuring a level of " +level +" percent";
 const message2 = "at a temperature of " +temperature +"° Celsius.";
 conv.add(message+message2);
});
```

### 5.5 - Netilion API in Python

Es wurde ebenfalls ein kleines Beispiel erstellt, wie man in Python, mithilfe des requests packages auf seine Messdaten zugreifen kann.

```py
import requests
import json
accept = 'application/json'
auth = 'YOUR AUTH',
key = 'YOUR KEY'
def getAssetID():
 response = requests.get(
 'https://api.netilion.endress.com/v1/assets',
 headers={
 'accept': accept,
 'Authorization': auth,
 'API-Key': key
 }
 )
 json_response_id = response.json()
 asset_id = json_response_id['assets'][0]['id']
 print(asset_id)
```

## 6 Letzte Worte

Vielen Dank für Ihr Interesse an meiner Diplomarbeit.

Selbstverständlich ist diese Readme nur ein minimaler Einblick in das gesamte Projekt. Beispielsweise wurden die Projektübersicht, Vorprojektphase, das Projektmanagement, White Paper, Qualitätsmanagement und die Dokumentation komplett ausgelassen. Auch über die hier behandelten Abschnitte können Sie in den 185 Seiten der [offiziellen Dokumentation](https://github.com/zangerls/eCubed/blob/main/Dokumentation/eCubed%20Dokumentation.pdf) mehr lesen.
