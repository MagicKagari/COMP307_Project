<?php
header('Access-Control-Allow-Origin: *');  

$connect=mysql_connect('localhost','root','comp307project');
$DB=mysql_select_db('ProjectDB',$connect);


$parsed_json = json_decode($_POST["Friend"]);
$username=$parsed_json->{'username'};
$friend = $parsed_json->{'friendname'};


$query1="SELECT userID FROM Members where username='$username'";
$result1=mysql_query($query1, $connect);
$row1=mysql_fetch_array($result1);
$userID=$row1['userID'];

$query2="SELECT username FROM Members where username='$friend'";
$result2=mysql_query($query2, $connect);
$row2=mysql_fetch_array($result2);


$compare=strcmp($friend, $row2['username']);
if($compare==0){
 $query3="INSERT INTO Friends (userID, friends) VALUES ($userID, $friend)";
 $result3=mysql_query($query3);
 echo "0";
}
 else {echo "1";
 }

 ?>
