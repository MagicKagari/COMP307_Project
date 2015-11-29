<?php
header('Access-Control-Allow-Origin: *');  
$connect=mysql_connect('localhost','root','comp307project');
$DB=mysql_select_db('ProjectDB',$connect);

$parsed_json = json_decode($_POST["jsonUser"]);
$fromStorage=$parsed_json->{'sessionID'};
settype($fromStorage, "integer");

$query="DELETE FROM Session where sessionID=$fromStorage";
$result=mysql_query($query);
echo "0";

?>
