function getData(level) {
  $.ajax({
    url: "api/server.php/?",
    method: 'GET',
    data: {
      level: level
    },
    success: function (data) {
      checkAccess(data);
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


function graphTeamEfficiencyConfig(data) {
  var months = moment.months();
  var teamEfficiencyHtmlGraph = '#efficiency'
  printChartEfficiency(data.team_efficiency, teamEfficiencyHtmlGraph, months)
}


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


function printChartEfficiency(data, graphSelection, months) {
  var ctx = $(graphSelection);
  var myChart = new Chart(ctx, {
    type: data.type,
    data: {
      labels: months,
      datasets: [{
        label: data.labels[0],
        data: data.data[0],
        borderColor: ['rgba(26,26,177)',],
        borderWidth: 3
      },
      {
        label: data.labels[1],
        data: data.data[1],
        borderColor: ['rgba(17,101,23)',],
        borderWidth: 3
      },
      {
        label: data.labels[2],
        data: data.data[2],
        borderColor: ['rgba(197,153,67)',],
        borderWidth: 3
      }]
    },
  });
}

function getUrlLevel() {
  var url_string = window.location;
  var url = new URL(url_string);
  var level = url.searchParams.get("level");
  getData(level);
}

function checkAccess(data) {
  if (data.team_efficiency) {
    graphFatturatoConfig(data);
    graphByAgentConfig(data);
    graphTeamEfficiencyConfig(data)
  } else if (data.fatturato_by_agent) {
    graphFatturatoConfig(data);
    graphByAgentConfig(data);
  } else if (data.fatturato) {
    graphFatturatoConfig(data);
  }
}




function init() {
  getUrlLevel();
  moment.locale('it');
}

$(document).ready(init);