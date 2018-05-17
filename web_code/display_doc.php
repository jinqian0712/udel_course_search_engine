<?php
    session_start();
    date_default_timezone_set('UTC');
    $documens = $_SESSION["document"];
    $doc_sort = array();
    $docLen = count($documens);
    arsort($documens);
    $i=0;
    foreach($documens as $key => $val){
        $doc_sort[$i]["doc"] = $val["document"];
        $i++;
    }
    
    $course_db = new PDO("sqlite:../web_data/class_info.db");
    $course_db->setAttribute(PDO::ATTR_ERRMODE, 
                             PDO::ERRMODE_EXCEPTION);
    $query = "";
    $results_call = array();
    for($j=0;$j<count($doc_sort);$j++){
        $query = "select courseName,instructor,describe,department,url from courses where ID=".$doc_sort[$j]["doc"].";";  
        $statement=$course_db->prepare($query);
        $statement->execute();
        $results = $statement->fetchAll(PDO::FETCH_OBJ);
        $results_call[$j]["courseName"] = $results[0]->courseName;
        $results_call[$j]["instructor"] = $results[0]->instructor;
        $results_call[$j]["describe"] = $results[0]->describe;
        $results_call[$j]["department"] = $results[0]->department;
        $results_call[$j]["url"] = $results[0]->url;
    }
    echo json_encode($results_call);
?>