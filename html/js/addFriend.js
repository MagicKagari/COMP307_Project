function checkFriend(){
	
	var username = document.getElementById("username").value;
	var friendname = document.getElementById("friendname").value;
	
	var Friend = new Object();
		Friend.friendname = friendname;
		Friend.username=username;
		jsonString = JSON.stringify(Friend);
	
		xhttp = new XMLHttpRequest();
  			xhttp.onreadystatechange = function() {
  				//TO GET SHAREDKEY 
    			if (xhttp.readyState == 4 && xhttp.status == 200) {
      				 var check= xhttp.responseText;
      				 if(check==0){
      				 	alert("Added");
      				 }
      				 else{
      				 	alert("Name not found");
      				 }

					}
  			}
  		xhttp.open("POST", "http://159.203.18.55/php/addFriend.php", true);
  		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("jsonUser="+jsonString);
  		xhttp.send();
	}

