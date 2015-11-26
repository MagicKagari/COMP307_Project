
function checkLogin(){

	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;

	var sharedKey= 0;
	var sessionID= 0;

	var user = new Object();
		user.username = username;
		jsonString = JSON.stringify(user);

		xhttp = new XMLHttpRequest();
  			xhttp.onreadystatechange = function() {
  				//TO GET SHAREDKEY
    			if (xhttp.readyState == 4 && xhttp.status == 200) {
      				sharedKey = xhttp.responseText;

					var encryptedPassword = encrypt(password, sharedKey);

					var account = new Object();
						account.username = username;
						account.password = encryptedPassword;
						jsonString = JSON.stringify(account);

						xhttp = new XMLHttpRequest();
  							xhttp.onreadystatechange = function() {
  								//TO GET THE PASSWORD MATCHING RESULT
    							if (xhttp.readyState == 4 && xhttp.status == 200) {
      								var check=xhttp.responseText;

      								check=parseInt(check);
      								 //ONCE THE CHECK IS TRUE
      								if(check==0){
      										xhttp = new XMLHttpRequest();
  											xhttp.onreadystatechange = function() {
  												if (xhttp.readyState == 4 && xhttp.status == 200) {
  													sessionID=xhttp.responseText;
  													localStorage.setItem("currentSession", sessionID);
												    $(".username").animate({opacity:0},200,function(){$(".username").css("display","none");});
												    $(".password").animate({opacity:0},200,function(){$(".password").css("display","none");});
												    $(".loginBtn").animate({opacity:0},200,function(){$(this).css("display","none");});
												    $(".signupBtn").animate({opacity:0},200,function(){$(".signupBtn").css("display","none");});
												    $(".loginBox").animate({height:"0px"},200,function(){
													    $(".loginBox").css("display","none");
													    $(".infoBox").css("display","block");
													    $(".infoBox").height(0);
													    var $scrolled = localStorage.getItem("scrolled");
													    if($scrolled === false){
													    	$(".infoBox").animate({height:$(window).height()-210},400);
													    }
													    else{
													        $(".infoBox").animate({height:$(window).height()-100},400);
													    }
												    });
    											}

  											}
												xhttp.open("POST", "http://159.203.18.55/php/sessionID.php", true);
  											//xhttp.open("POST", "http://localhost/php/sessionID.php", true);
  											//xhttp.open("POST", "~/COMP307_Project/php/sessionID.php", true);
  											xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
											xhttp.send("jsonAccount="+jsonString);
  											xhttp.send();
      								}
      								else{
      									alert("Did not work");
      									/*Hello, Stanley*/
      								//IF THE LOGIN WAS NOT SUCCESSFULL
      								}
     							}
  							}
								xhttp.open("POST", "http://159.203.18.55/php/test.php", true);
								//xhttp.open("POST", "http://localhost/php/test.php", true);
	  						xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					  	xhttp.send("jsonAccount="+jsonString);
  						xhttp.send();
    			}
  			}
				xhttp.open("POST", "http://159.203.18.55/php/getSharedKey.php", true);
				//xhttp.open("POST", "http://localhost/php/getSharedKey.php", true);
	  		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	  	xhttp.send("jsonUser="+jsonString);
  		xhttp.send();
	}


function encrypt(original, key){
	var encryptedString = "";
	var shift=key;
	for(i = 0; i< original.length;i++){
		var str= original.charAt(i);
		var ascii = str.charCodeAt(0);
		var addition = parseInt(ascii) + parseInt(shift);
		if(ascii >= 65 && ascii <=90){
			ascii = ((addition - 65)%26)+65;
		}
		else if(ascii >=97 && ascii <= 122){
			ascii = ((addition - 97)%26)+97;
		}
		encryptedString = encryptedString + String.fromCharCode(ascii);
	}
	return encryptedString;
}
