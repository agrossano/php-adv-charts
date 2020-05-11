
function getLineChartDemo() {
  var ctx = $('#myChart');
  $.ajax({
    url: "API/server.php",
    method: 'GET',
    success: function (data) {
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
          datasets: [{
            label: 'Vendite',
            data: data,
            backgroundColor: [
              'rgba(1,128,1)',
            ],
            borderColor: [
              'rgba(211,40,52)',
            ],
            borderWidth: 3
          }]
        },
        options: {
          scales: {
            xAxes: [{
              ticks: {
                autoSkip: false,
                minRotation: 45,
              }
            }],
            yAxes: [{
              ticks: {
                autoSkip: false,
                maxRotation: 0,
                minRotation: 0,
                beginAtZero: true
              }
            }]
          }
        }
      });
    },
    error: function (error) {
      alert('error')
    }
  });


}



function init() {
  getLineChartDemo()
}

$(document).ready(init);