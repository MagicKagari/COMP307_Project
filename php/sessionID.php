<?php

$connect=mysql_connect('localhost','root','comp307project');  
$DB=mysql_select_db('ProjectDB',$connect);

$parsed_json = json_decode($_POST["jsonAccount"]);
$username = $parsed_json->{'username'}; 

$queryM="SELECT userID FROM Members where username='$username'";

$result1=mysql_query($queryM, $connect);
$row1=mysql_fetch_array($result1);

$userID=$row1['userID'];

$queryS="SELECT sessionID FROM Session where userID=$userID";

$result2=mysql_query($queryS, $connect);
$row2=mysql_fetch_array($result2);

echo $row2['sessionID'];

 ?>
