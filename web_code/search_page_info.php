<?php
    session_start();
    $call_back = array();
    $query = $_SESSION["query"];
    $call_back["title"] = $query;
    
    echo json_encode($call_back);
?>