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
      type:"POST",
      data: JSON.stringify(register),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(msg){
        var ret = msg.result;
        if(ret){
          alert("Thank you for registration");
          window.location = "index.html"
        }else{
          alert(msg.info);
        }
      },
      error: function(error){
        alert(JSON.stringify(error));
      }
    });
  });

  //make sure password confirms
  $("#signup-password").on('input',function(){
    var confirm = $("#signup-confirm").val();
    if(this.value !== confirm ){
      $("#signup-message").text("Password not match.");
      $("#signup-button").prop("disabled", true);
    }else{
      $("#signup-message").text("");
      $("#signup-button").prop("disabled", false);
    }
  });
  $("#signup-confirm").on('input',function(){
    var password = $("#signup-password").val();
    if(this.value !== password ){
      $("#signup-message").text("Password not match.");
      $("#signup-button").prop("disabled", true);
    }else{
      $("#signup-message").text("");
      $("#signup-button").prop("disabled", false);
    }
  });




});
