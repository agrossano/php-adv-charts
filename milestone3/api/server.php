<?php 

header('Content-Type: application/json');

include __DIR__. '/database.php';


$graphs = arrFatturatoAgents($graphs);
$graphs = arrTeamEfficiency($graphs);


function arrFatturatoAgents($graphs) {
  $fatturatoAgent = ($graphs['fatturato_by_agent']['data']);

  foreach ($fatturatoAgent as $key => $value) {
    $dataAgents[] = ($value);
    $nameAgents[] = ($key);
  };

  $graphs['fatturato_by_agent']['data'] = $dataAgents;
  $graphs['fatturato_by_agent']['labels'] = $nameAgents;
  return $graphs;
};


function arrTeamEfficiency($graphs) {
  $teamEfficiency = ($graphs['team_efficiency']['data']);

  foreach ($teamEfficiency as $key => $value) {
  $dataTeams[] = ($value);
  $labelTeams[] = ($key);
  };

  $graphs['team_efficiency']['labels'] = $labelTeams;
  $graphs['team_efficiency']['data'] = $dataTeams;
  return $graphs;
};

$level = $_GET['level'];
if (!$level) {
  $level = 'guest';
}

if ($level === 'guest') {
  unset($graphs['team_efficiency']);
  unset($graphs['fatturato_by_agent']);
  echo json_encode($graphs);
} elseif ($level ==='employee') {
  unset($graphs['team_efficiency']);
  echo json_encode($graphs);
} elseif ($level ==='clevel') {
  echo json_encode($graphs);
}



?>