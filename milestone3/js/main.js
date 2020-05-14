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
  var borderColor = ["borderColor"]
  var borderColor0 = ['rgba(26,26,177)',]; var borderColor1 = ['rgba(17,101,23)']; var borderColor2 = ['rgba(197,153,67)'];
  var datasets = [];
  for (var i = 0; i < data.team_efficiency.labels.length; i++) {
    datasets.push({
      label: data.team_efficiency.labels[i],
      data: data.team_efficiency.data[i],
      borderColor: eval(borderColor + i)
    })
  }

  console.log(datasets)
  printChartEfficiency(data.team_efficiency, teamEfficiencyHtmlGraph, months, datasets)
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
        borderColor: ['rgba(211,40,52)'],
        borderWidth: 3
      }]
    },
    options: options
  });
}


function printChartEfficiency(data, graphSelection, months, datasets) {
  var ctx = $(graphSelection);
  var myChart = new Chart(ctx, {
    type: data.type,
    data: {
      labels: months,
      datasets: datasets
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