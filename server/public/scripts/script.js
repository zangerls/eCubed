let xhttp;

/* INSERTS LEVEL ARRAY INTO THE LEVEL CHART */
function loadLevelChart() {
    xhttp = new XMLHttpRequest();
    xhttp.open('get', '/loadlevel', true);
    xhttp.onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 200) {
            let response = this.responseText;
            let leveldata = JSON.parse(response);
            levelChart.data.datasets[0].data = leveldata;
        }
    }
    xhttp.send();
}

/* INSERTS TEMPERATURE ARRAY INTO THE TEMPERATURE CHART */
function loadTempChart() {
    xhttp = new XMLHttpRequest();
    xhttp.open('get', '/loadtemp', true);
    xhttp.onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 200) {
            let response = this.responseText;
            let tempdata = JSON.parse(response);
            tempChart.data.datasets[0].data = tempdata;
        }
    }
    xhttp.send();
}

/* INSERTS DISTANCE ARRAY INTO THE DISTANCE CHART */
function loadDistChart() {
    xhttp = new XMLHttpRequest();
    xhttp.open('get', '/loaddist', true);
    xhttp.onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 200) {
            let response = this.responseText;
            let distdata = JSON.parse(response);
            distChart.data.datasets[0].data = distdata;
        }
    }
    xhttp.send();
}

/* INSERTS BATTERY ARRAY INTO THE BATTERY CHART */
function loadMiscChart() {
    xhttp = new XMLHttpRequest();
    xhttp.open('get', '/loadmisc', true);
    xhttp.onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 200) {
            let response = this.responseText;
            let miscdata = JSON.parse(response);
            batteryChart.data.datasets[0].data = miscdata;
        }
    }
    xhttp.send();
}