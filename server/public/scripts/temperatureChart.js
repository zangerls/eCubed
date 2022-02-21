Chart.defaults.global.defaultFontFamily = 'Raleway';
Chart.defaults.global.defaultFontColor = '#fff';

/* PLACES CHART WITHIN CANVAS WITH ID 'tempChart' */
let ctx = document.getElementById('tempChart').getContext('2d');

    /* CREATES THE TEMPERATURE CHART */
    let tempChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Last Update', '1 Hour ago', '2 Hours ago', '3 Hours ago', '4 Hours ago', '5 Hours ago', '6 Hours ago', '7 Hours ago',
                '8 Hours ago', '9 Hours ago', '10 Hours ago', '11 Hours ago',],
            datasets:[{
                label: 'Temperature',
                data: [],
                borderColor: 'rgba(255,255,255,1)',
                backgroundColor: 'rgba(255,255,255,0.0)',
                borderWidth: 1,
                borderColor: 'rgba(253,62,37,1)',
                backgroundColor: 'rgba(253,62,37,0.1)'
            },]
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