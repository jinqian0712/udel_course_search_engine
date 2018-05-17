<?php
    session_start();
    $query = $_SESSION["query"];
    $url = "https://online.stanford.edu/courses?keywords=".$query."&availability[available]=available";
    $result = json_decode(exec("python coursera.py ".$url), true);
    
    echo json_encode($result);
?>