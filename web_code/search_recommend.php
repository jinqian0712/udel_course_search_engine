<?php
    function unique_multidim_array($array, $key) { 
        $temp_array = array(); 
        $i = 0; 
        $key_array = array(); 
        foreach($array as $val) { 
            if (!in_array($val[$key], $key_array)) { 
                $key_array[$i] = $val[$key]; 
                $temp_array[$i] = $val; 
                $i++;
            } 
            //$i++; 
        } 
        return $temp_array;
    } 
    date_default_timezone_set('UTC');
    $data = json_decode(file_get_contents("php://input"),true);
    $search_key = $data["search_key"];
    $search_key = "%".$search_key."%";
    $call_back = array();
    $course_db = new PDO("sqlite:../web_data/class_info.db");
    $course_db->setAttribute(PDO::ATTR_ERRMODE, 
                           PDO::ERRMODE_EXCEPTION);
    $query = "select courseName from courses where courseName like :search_key limit 200";
    $statement=$course_db->prepare($query);
    $statement->bindParam(":search_key",$search_key);
    $statement->execute();
    $results = $statement->fetchAll(PDO::FETCH_OBJ);
    $resultsLen = count($results);
    if($resultsLen != 0){
        for($i=0;$i<$resultsLen;$i++){
            $temp = (string)$results[$i]->courseName;
            $courseName = substr($temp,11);
            $call_back[$i]["courseName"] = $courseName;
        }
        $return = array();
        $call_back = unique_multidim_array($call_back,"courseName");
        if(count($call_back)<10){
            for($i=0;$i<count($call_back);$i++){
                $return[$i]["courseName"] = $call_back[$i]["courseName"];
            }
        }else{
            for($i=0;$i<10;$i++){
                $return[$i]["courseName"] = $call_back[$i]["courseName"];
            }
        }
        echo json_encode($return);
    }else{
        echo json_encode($results);
    }
?>