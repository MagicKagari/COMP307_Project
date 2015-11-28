<?php
header('Access-Control-Allow-Origin: *');  
$connect=mysql_connect('localhost','root','comp307project');
$DB=mysql_select_db('ProjectDB',$connect);


$parsed_json = json_decode($_POST["jsonUser"]);
$username = $parsed_json->{'username'};

$query="SELECT sharedkey FROM Members where username='$username'";


$result=mysql_query($query, $connect);
$row=mysql_fetch_array($result);


echo $row['sharedkey'];

 ?>
