<?php

$connect=mysql_connect('localhost','root','comp307project');  
$DB=mysql_select_db('ProjectDB',$connect);

$query="SELECT * FROM session";

$result=mysql_query($query, $connect);
$row=mysql_fetch_array($result);

$fromHTML=$_POST["hiddenfield"];
settype($fromHTML, "integer");
$fromDB=$row['sessionID'];
settype($fromDB, "integer");


if ($fromDB==$fromHTML){
//$query="DELETE FROM session where sessionID=$fromDB";
$query="DELETE FROM Session where sessionID=$fromHTML";
$result=mysql_query($query);
echo "0";
}
else {
echo "1";
}



?>
