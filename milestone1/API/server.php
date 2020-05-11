<?php 

header('Content-Type: application/json');

include __DIR__. '/database.php';


echo json_encode($data);

?>