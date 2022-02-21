Chart.defaults.global.defaultFontFamily = 'Raleway';
Chart.defaults.global.defaultFontColor = '#fff';

/* PLACES CHART WITHIN CANVAS WITH ID 'miscChart' */
let ctx = document.getElementById('miscChart').getContext('2d');

    /* CREATES THE BATTERY CHART */
    let batteryChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Last Update', '16 Days ago', '1 Month ago', '1 Month 16 Days ago', '2 Months ago', '2 Months 16 Days ago', '3 Months ago', '3 Months 16 Days ago',
                '4 Months ago', '4 Months 16 Days ago', '5 Months ago', '5 Months 16 Days ago',],
            datasets: [{
                label: 'Battery',
                data: [],
                borderColor: 'rgba(255,255,255,1)',
                backgroundColor: 'rgba(255,255,255,0.0)',
                borderWidth: 1,
                borderColor: 'rgb(0, 194, 120)',
                backgroundColor: 'rgba(0, 194, 120, 0.1)'
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