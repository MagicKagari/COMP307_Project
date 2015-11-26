<?php
header('Access-Control-Allow-Origin: *');  

$connect=mysql_connect('localhost','root','comp307project');
$DB=mysql_select_db('ProjectDB',$connect);



$parsed_json = json_decode($_POST["jsonAccount"]);
$username = $parsed_json->{'username'};
$enpassword = $parsed_json->{'password'};


//=======================================
//CHECK THE ENCRPITED PASSWORD AND FROM THE DATABASE
//
$query2="SELECT * FROM Members where username='$username'";

$result2=mysql_query($query2);
$row2=mysql_fetch_array($result2);

$password=$row2['password'];
$memberID=$row2['userID'];


$query1="SELECT sharedkey FROM Members where username='$username'";

$result1=mysql_query($query1, $connect);
$row1=mysql_fetch_array($result1);

$sharedkey=$row1['sharedkey'];

settype($sharedkey, "integer");

$desharedkey= $sharedkey*(-1);

$decryptedPassword=decrypt($enpassword, $desharedkey);
function decrypt($str, $n) {

	$ret = "";
	for($i = 0, $l = strlen($str); $i < $l; ++$i) {
		$c = ord($str[$i]);
		if (97 <= $c && $c < 123) {
			$ret.= chr(($c + $n + 7) % 26 + 97);
		} else if(65 <= $c && $c < 91) {
			$ret.= chr(($c + $n + 13) % 26 + 65);
		} else {
			$ret.= $str[$i];
		}
	}
	return $ret;
}


//======================================
//if EQUAL, ECHO 0 AND SESSION
$compare=strcmp($decryptedPassword,$password);
if($compare==0){
//==========================

   $x=rand();
   $query3="INSERT INTO Session (userID, sessionID) VALUES ($userID, $x)";
   $result3=mysql_query($query3);
//=====================
echo "0";

}
//IF NOT, ECHO 1
else
echo "1";
 ?>
