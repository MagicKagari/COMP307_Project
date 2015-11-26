//js file to register
$(document).ready(function(){
  

  //signup
  $("#signup-button").click(function(){
    var username = $("#signup-username").val();
    var password = $("#signup-password").val();
    var address = $("#signup-address").val();

    var register = {'username':username,'password':password,'address':address};
    $.ajax({
      url:"http://159.203.18.55:1337/node/members/register",
      //url:'http://localhost:1337/node/members/register',
      type:"POST",
      data: JSON.stringify(register),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(msg){
        var ret = msg.result;
        if(ret){
          $(".1").animate({opacity:0},150,function(){
            $(".2").animate({opacity:0},150,function(){
              $(".3").animate({opacity:0},150,function(){
                $(".4").animate({opacity:0},150,function(){
                  $(".5").animate({opacity:0},150,function(){
                    $(".6").animate({opacity:0},150,function(){
                      $(".loginForm").animate({height:"200px"},300,function(){$(".confirmForm").css("display","block");
          $(".confirmForm").animate({opacity:1},300);});;});});});});});});
          
          }else{
          if(msg.info === "duplicate username")
          {
            $("#usernameError").text("This username is already taken.");
          }

        }
      },
      error: function(error){
        alert(error.info);
      }
    });
  });
  $("#signup-button").prop("disabled", true);
  $validUsername = false;
  $validAddress = false;
  $validPassword = false;
  //make sure password confirms
  $("#signup-username").on('input',function(){
    if(this.value !== ""){
      $validUsername = true;
    }
    else
    {
      $validUsername = false;
    }

    if($validUsername && $validAddress && $validPassword){
      $("#signup-button").prop("disabled", false);
    }
    else{
      $("#signup-button").prop("disabled", true);
    }
  });
  $("#signup-address").on('input',function(){
    if(this.value !== ""){
      $validAddress = true;
    }
    else
    {
      $validAddress = false;
    }
    if($validUsername && $validAddress && $validPassword){
      $("#signup-button").prop("disabled", false);
    }
    else{
      $("#signup-button").prop("disabled", true);
    }
  });
  $("#signup-password").on('input',function(){
    var confirm = $("#signup-confirm").val();
    if(this.value === ""){
      $("#signup-message").text("");
      $validPassword = false;
    }
    else if(this.value !== confirm ){
      $("#signup-message").text("Passwords do not match.");
      $validPassword = false;
    } 
    else
    {
      $("#signup-message").text("");
      $validPassword = true;
    }
    if($validUsername && $validAddress && $validPassword){
      $("#signup-button").prop("disabled", false);
    }
    else{
      $("#signup-button").prop("disabled", true);
    }
  });
  $("#signup-confirm").on('input',function(){
    var password = $("#signup-password").val();
    if(this.value == ""){
      $("#signup-message").text("");
      $validPassword = false;
    } else if(this.value !== password ){
      $("#signup-message").text("Passwords do not match.");
      $validPassword = false;
    }else{
      $("#signup-message").text("");
      $validPassword = true;
    }
    if($validUsername && $validAddress && $validPassword){
      $("#signup-button").prop("disabled", false);
    }
    else{
      $("#signup-button").prop("disabled", true);
    }
  });

});
