<?php
header('Access-Control-Allow-Origin: *');  
$connect=mysql_connect('localhost','root','comp307project');
$DB=mysql_select_db('ProjectDB',$connect);

$query="SELECT * FROM Session";
$result=mysql_query($query, $connect);
$row=mysql_fetch_array($result);
$fromDB=$row['sessionID'];
settype($fromDB, "integer");

$parsed_json = json_decode($_POST["jsonUser"]);
$fromStorage=$parsed_json->{'sessionID'};
settype($fromStorage, "integer");

if ($fromDB==$fromStorage){
$query="DELETE FROM Session where sessionID=$fromStorage";
$result=mysql_query($query);
echo "0";
}
else {
echo "1";
}

?>
