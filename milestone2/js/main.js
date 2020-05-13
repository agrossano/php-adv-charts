function getData() {
  $.ajax({
    url: "api/server.php",
    method: 'GET',
    success: function (data) {
      graphFatturatoConfig(data);
      graphByAgentConfig(data);
    },
    error: function (error) {
      alert('error')
    }
  });
}

function graphFatturatoConfig(data) {
  var months = moment.months();
  var fatturatoHtmlGraph = '#vendite'
  var colors = ['rgba(1,128,1)'];
  var options = {
    scales: {
      xAxes: [{
        ticks:
        {
          minRotation: 45,
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  printChart(data.fatturato, fatturatoHtmlGraph, months, colors, options, months);
};


function graphByAgentConfig(data) {
  var byAgentHtmlGraph = '#agents'
  var colors = ['rgba(150, 33, 146, 1)', 'rgba(82, 40, 204, 1)', 'rgba(4, 51, 255, 1)', 'rgba(0, 146, 146, 1)'];
  printChart(data.fatturato_by_agent, byAgentHtmlGraph, data.fatturato_by_agent.labels, colors);
};


function printChart(data, graphSelection, labels, colors, options) {
  var ctx = $(graphSelection);
  var myChart = new Chart(ctx, {
    type: data.type,
    data: {
      labels: labels,
      datasets: [{
        label: 'Vendite',
        data: data.data,
        backgroundColor: colors,
        borderColor: [
          'rgba(211,40,52)',
        ],
        borderWidth: 3
      }]
    },
    options: options
  });
}


function init() {
  getData();
  moment.locale('it');
}

$(document).ready(init);