<?php 

header('Content-Type: application/json');

include __DIR__. '/database.php';

$fatturatoAgent = ($graphs['fatturato_by_agent']['data']);

foreach ($fatturatoAgent as $key => $value) {
  $dataAgents[] = ($value);
  $nameAgents[] = ($key);
}

$graphs['fatturato_by_agent']['data'] = $dataAgents;
$graphs['fatturato_by_agent']['labels'] = $nameAgents;

echo json_encode($graphs);
?>