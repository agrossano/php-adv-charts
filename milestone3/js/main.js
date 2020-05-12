
function getData() {
  $.ajax({
    url: "api/server.php",
    method: 'GET',
    success: function (data) {
      graphFatturatoConfig(data);
      graphByAgentConfig(data);
      graphTeamEfficiencyConfig(data);
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


function graphTeamEfficiencyConfig(data) {
  var months = moment.months();
  var teamEfficiencyType = data['team_efficiency']['type'];
  var teamEfficiencyData = data['team_efficiency']['data'];
  var teamLabel = data['team_efficiency']['labels'];
  var teamEfficiencyHtmlGraph = '#efficiency'
  printChartEfficiency(teamEfficiencyType, teamEfficiencyData, teamLabel, teamEfficiencyHtmlGraph, months)
}


function printChart(type, data, labels, graphSelection, colors, options, aaa) {
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
        aaa,
        borderWidth: 3
      }]
    },
    options: options
  });
}

function printChartEfficiency(type, data, labels, graphSelection, months) {
  var ctx = $(graphSelection);
  var myChart = new Chart(ctx, {
    type: type,
    data: {
      labels: months,
      datasets: [{
        label: labels[0],
        data: data[0],
        borderColor: [
          'rgba(26,26,177)',
        ],
        borderWidth: 3
      },
      {
        label: labels[1],
        data: data[1],
        borderColor: [
          'rgba(17,101,23)',
        ],
        borderWidth: 3
      },
      {
        label: labels[2],
        data: data[2],
        borderColor: [
          'rgba(197,153,67)',
        ],
        borderWidth: 3
      }]
    },
  });
}


function init() {
  getData();
  moment.locale('it');
}

$(document).ready(init);