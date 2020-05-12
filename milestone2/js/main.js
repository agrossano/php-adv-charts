
function getData() {
  $.ajax({
    url: "API/server.php",
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
  var fatturatoType = data['fatturato']['type'];
  var fatturatoData = data['fatturato']['data'];
  var fatturatoHtmlGraph = '#vendite'
  var colors = ['rgba(1,128,1)'];
  var options = {
    scales: {
      xAxes: [{
        ticks: {
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
  printChart(fatturatoType, fatturatoData, months, fatturatoHtmlGraph, colors, options);
};


function graphByAgentConfig(data) {
  var byAgentType = data['fatturato_by_agent']['type'];
  var byAgentData = data['fatturato_by_agent']['data'];
  var names = data['fatturato_by_agent']['labels'];
  var byAgentHtmlGraph = '#agents'
  var colors = [
    'rgba(150, 33, 146, 1)',
    'rgba(82, 40, 204, 1)',
    'rgba(4, 51, 255, 1)',
    'rgba(0, 146, 146, 1)'
  ];
  printChart(byAgentType, byAgentData, names, byAgentHtmlGraph, colors);
};


function printChart(type, data, labels, graphSelection, colors, options) {
  var ctx = $(graphSelection);
  var myChart = new Chart(ctx, {
    type: type,
    data: {
      labels: labels,
      datasets: [{
        label: 'Vendite',
        data: data,
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