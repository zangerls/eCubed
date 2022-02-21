Chart.defaults.global.defaultFontFamily = 'Raleway';
Chart.defaults.global.defaultFontColor = '#fff';

/* PLACES CHART WITHIN CANVAS WITH ID 'levelChart' */
let ctx = document.getElementById('levelChart').getContext('2d');

    /* CREATES THE LEVEL CHART */
    let levelChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Last Update', '1 Hour ago', '2 Hours ago', '3 Hours ago', '4 Hours ago', '5 Hours ago', '6 Hours ago', '7 Hours ago',
                '8 Hours ago', '9 Hours ago', '10 Hours ago', '11 Hours ago',],
            datasets: [{
                label: 'Level',
                data: [],
                borderColor: 'rgba(255,255,255,1)',
                backgroundColor: 'rgba(255,255,255,0.0)',
                borderWidth: 1,
                borderColor: '#42bcf5',
                backgroundColor: 'rgba(66,188,245,0.1)'
            }, {
                label: 'Minimum',
                data: [
                    20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
                ],
                borderColor: 'rgb(255,0,0)',
                borderWidth: 1,
                pointRadius: 0
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false
                    }
                }]
            }
        }
    });