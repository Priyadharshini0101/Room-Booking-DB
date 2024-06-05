<?php
if($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['jsonData'])  ){
    $jsonData = $_POST['jsonData'];
     
    $filePath = '/opt/lampp/htdocs/Assessment_5/StayFlex-jul23/AngularJS_Unit2_6/app/controller/data.json';
    $currentData = file_get_contents($filePath);
    $existingData = json_decode($currentData, true);
    $decodedData = json_decode($jsonData, true);
  
   
    if ($decodedData !== null) {
        foreach($existingData as &$object){
            if($object['id'] === $_POST['user_id']){
                foreach ($object['customers'] as $index => &$customer) {
                     
                    if ($customer['email'] === $decodedData['email']) {
                        foreach ($decodedData as $key => $value) {
                            $customer[$key] = $value;
                        }
                    
                    }
                }
               
         }
        }

       $updatedData = json_encode($existingData, JSON_PRETTY_PRINT);

        if (file_put_contents($filePath, $updatedData) !== false) {
                echo 'Data has been successfully saved to data.json';
        } else {
                echo 'Error saving data to data.json: ' . error_get_last()['message'];
        }
    
    
    }else{
        echo 'Invalid JSON data';
    }




 }

else if($_SERVER['REQUEST_METHOD'] === 'POST'&& isset($_POST['user_id']) ){
    $jsonData = $_POST['data'];
   
    $filePath = '/opt/lampp/htdocs/Assessment_5/StayFlex-jul23/AngularJS_Unit2_6/app/controller/data.json';
    $currentData = file_get_contents($filePath);
    $existingData = json_decode($currentData, true);
    $decodedData = json_decode($jsonData, true);
  
   
    if ($decodedData !== null) {
       foreach($existingData as &$object){
            if($object['id'] === $_POST['user_id']){
            $object["customers"][] = $decodedData;
         }
       }

       $updatedData = json_encode($existingData, JSON_PRETTY_PRINT);

        if (file_put_contents($filePath, $updatedData) !== false) {
                echo 'Data has been successfully saved to data.json';
        } else {
                echo 'Error saving data to data.json: ' . error_get_last()['message'];
        }
    } else {
            echo 'Invalid JSON data';
    }
}else if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $jsonData = $_POST['data'];
    $filePath = '/opt/lampp/htdocs/Assessment_5/StayFlex-jul23/AngularJS_Unit2_6/app/controller/data.json';
    $currentData = file_get_contents($filePath);
    $existingData = json_decode($currentData, true);
    $decodedData = json_decode($jsonData, true);

    if ($decodedData !== null) {
        if (is_array($existingData)) {
            $existingData[] = $decodedData;
        } else {
            $existingData = [$decodedData];
        }

        $updatedData = json_encode($existingData, JSON_PRETTY_PRINT);

        if (file_put_contents($filePath, $updatedData) !== false) {
            echo 'Data has been successfully saved to data.json';
        } else {
            echo 'Error saving data to data.json: ' . error_get_last()['message'];
        }
        
    } else {
        echo 'Invalid JSON data';
    }
} 

?>