$.ajax({
   url: 'http://159.203.18.55:1337/node/product/getAllProduct',
   //url:'http://localhost:1337/node/product/getAllProduct',
   data: {
      format: 'string'
   },
   error: function() {
     alert("not working");
   },
   dataType: 'json',
   success: function(data) {
      displayProducts(data);   },
   type: 'GET'
});

localStorage.isLoggedIn = false;

function displayProducts(data) {
    var toAdd = document.getElementsByClassName("gallery");
    var i;
    var runTimes = Math.ceil(data.length/4);
    for(i = 0; i< runTimes; i++)
    {
      var row = document.createElement('div');
      row.className = "row";
      if( i < runTimes - 1){
        var col;
        for(col = 0; col<4; col++)
        {
          var column = document.createElement('div');
          var productBox = document.createElement('div');
          var productImage = document.createElement('img');
          var productTitle = document.createElement('h3');
          var productDescription = document.createElement('h5');
          var productPrice = document.createElement('h6');
          var sendBtn = document.createElement('input');


          column.className = "col-md-3 col-sm-3";
          productBox.className = "productBox";
          productImage.className = "productImage img-circle img-responsive";
          productTitle.className = "productTitle";
          productDescription.className = "productDescription";
          sendBtn.className = "addToCart";

          productImage.setAttribute('src', "img/"+data[i*4 + col].img);
          productTitle.innerHTML = data[i*4 + col].productName;
          productDescription.innerHTML = data[i*4 + col].description;
          productPrice.innerHTML = "$"+data[i*4 + col].price;
          sendBtn.value= "ADD TO CART";
          sendBtn.type="submit";

          productBox.appendChild(productImage);
          productBox.appendChild(productTitle);
          productBox.appendChild(productDescription);
          productBox.appendChild(productPrice);
          productBox.appendChild(sendBtn);

          column.appendChild(productBox);
          row.appendChild(column);
        }
      }
      else{
        var repeat = data.length %4;
        if(repeat == 0){repeat = 4;}
        var j;
        for(j=0; j<repeat; j++)
        {

        var column = document.createElement('div');
        var productBox = document.createElement('div');
        var productImage = document.createElement('img');
        var productTitle = document.createElement('h3');
        var productDescription = document.createElement('h5');
        var productPrice = document.createElement('h6');
        var sendBtn = document.createElement('input');


        column.className = "col-md-3 col-sm-3";
        productBox.className = "productBox";
        productImage.className = "productImage img-circle img-responsive";
        productTitle.className = "productTitle";
        productDescription.className = "productDescription";
        sendBtn.className = "addToCart";

        productImage.setAttribute('src', "img/"+data[(runTimes -1)*4+j].img);
        productTitle.innerHTML = data[(runTimes -1)*4+j].productName;
        productDescription.innerHTML = data[(runTimes -1)*4+j].description;
        productPrice.innerHTML = "$"+data[(runTimes -1)*4+j].price;
        sendBtn.value= "ADD TO CART";
        sendBtn.type="submit";

        productBox.appendChild(productImage);
        productBox.appendChild(productTitle);
        productBox.appendChild(productDescription);
        productBox.appendChild(productPrice);
        productBox.appendChild(sendBtn);

        column.appendChild(productBox);
        row.appendChild(column);
        }

      }
      toAdd[0].appendChild(row);
    }




}
localStorage.setItem("scrolled", false);
var $scrolled = localStorage.getItem("scrolled");

$( document ).ready(function() {
  //***********************************************
  //Open pop up after add-to-cart button is clicked
  //***********************************************
  /*
  $(".addToCart").click(function(){
    var $title = $(this).siblings(".productTitle").text();
    $(".productPageTitle").text($title);
    var $description = $(this).siblings(".productDescription").text();
    $(".productPageDescription").text($description);
    var $src = $(this).siblings(".productImage").attr("src");
    $(".productPageImage").attr("src", $src);
    $(".lightbox").css("display","block");
    $(".lightbox").animate({opacity:1},400);
  });
  */
  $( ".gallery" ).on( "click",".addToCart", function() {
  var $title = $(this).siblings(".productTitle").text();
    $(".productPageTitle").text($title);
    var $description = $(this).siblings(".productDescription").text();
    $(".productPageDescription").text($description);
    var $src = $(this).siblings(".productImage").attr("src");
    $(".productPageImage").attr("src", $src);
    $(".lightbox").css("display","block");
    $(".lightbox").animate({opacity:1},400);
  });


  //Stops click on popup to progagate to background
  $('.productPage').click(function (evt) {
    evt.stopPropagation();
  });
  //****************************************
  //Close popup if user clicks outside popup
  //****************************************
  $(".lightbox").click(function(){

    $(this).animate({opacity:0},200,function(){$(this).css("display","none");});
  });
  //******************************************
  //Close popup if user clicks on close button
  //******************************************
  $(".closeButton").click(function(){
    $(".lightbox").animate({opacity:0},200,function(){$(".lightbox").css("display","none");});
  });

  $(".loginBtn").click(function (){
    checkLogin();
  });

  //*******************************************************************************
  //Animates Header to shrink if page is scrolled and enlarge if page is at the top
  //*******************************************************************************
  var animating = false;
  $(window).scroll(function() {
    if ($(document).scrollTop() > 200 && animating == false) {
      animating = true;
      $scrolled = true;
      $('.title').animate({fontSize:"30px"},{ duration: 50, queue: false});
      $('.header').animate({height:"40px"},{ duration: 200, queue: false });
      $('.header').animate({paddingTop:"4px"},{ duration: 100, queue: false });
      $('.sidebar').animate({marginTop:"-110px"},{ duration: 200, queue: false, complete: function(){
      } });
      $(".infoBox").animate({height:$(window).height()-100},{duration: 50, queue: false });
      setTimeout(function(){animating=false; },200);
    } else if( animating == false){
      animating = true;
      $scrolled = false;
      $('.title').stop();
      $('.header').stop();
      $('.sidebar').stop();
      $('.infoBox').stop();
      $('.sidebar').animate({marginTop:"0px"},{ duration: 200, queue: false });
      $('.header').animate({paddingTop:"40px"},{ duration: 100, queue: false });
      $('.title').animate({fontSize:"60px"},{ duration: 50, queue: false });
      $('.header').animate({height:"150px"},{ duration: 200, queue: false });
      $(".infoBox").animate({height:$(window).height()-210},{ duration: 50, queue: false });
      setTimeout(function(){animating=false; },200);
    }
  });

  //check if user already logged on by checking cookies
  var userinfo = localStorage.userinfo;
  var username =localStorage.username;
  if(userinfo != null && username != null){
    userinfo = JSON.parse(userinfo);
    var $scrolled = localStorage.getItem("scrolled");
    $(".username").animate({opacity:0},200,function(){$(".username").css("display","none");});
    $(".password").animate({opacity:0},200,function(){$(".password").css("display","none");});
    $(".loginBox").animate({opacity:0},200,function(){$(this).css("display","none");});
    $(".signupBtn").animate({opacity:0},200,function(){$(".signupBtn").css("display","none");});
    $(".loginBox").animate({height:"0px"},200,function(){
      $(".loginBox").css("display","none");
      $(".infoBox").css("display","block");
      $(".infoBox").height(0);
      if($scrolled === false){
        $(".infoBox").animate({height:$(window).height()-210},400);
      }
      else{
        $(".infoBox").animate({height:$(window).height()-100},400);
      }
    });
    updateUserInformation(localStorage.username);
    localStorage.isLoggedIn = true;
  }
});

$(".loginBtn").prop("disabled", true);
$isUsernameFilled = false;
$isPasswordFilled = false;
$("#username").on('input',function(){
  if(this.value == "")
  {
    $isUsernameFilled = false;
  }
  else
  {
    $isUsernameFilled = true;
  }
  if($isUsernameFilled && isPasswordFilled)
  {
    $(".loginBtn").prop("disabled", false);
  }
  else
  {
    $(".loginBtn").prop("disabled", true);
  }
});
$("#password").on('input',function(){
  if(this.value == "")
  {
    $isPasswordFilled = false;
  }
  else
  {
    $isPasswordFilled = true;
  }
  if($isUsernameFilled && $isPasswordFilled)
  {
    $(".loginBtn").prop("disabled", false);
  }
  else
  {
    $(".loginBtn").prop("disabled", true);
  }
});

function updateUserInformation(username){
  $.ajax({
    url:"http://159.203.18.55:1337/node/members/getMemberInfo",
    //url:'http://localhost:1337/node/members/getMemberInfo',
    type:"POST",
    data: JSON.stringify({'username':username}),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(msg){
      var ret = msg.result;
      if(ret){
        localStorage.username = username;
        localStorage.userinfo = JSON.stringify(msg.info);
        $("#userinfo-name").text(localStorage.username);
        $("#userinfo-id").text(msg.info.userid);
        $("#userinfo-address").text(msg.info.address);
        $("#userinfo-credits").text('$'+msg.info.credits);
        $("#userinfo-presents").text(msg.info.numberOfPresents);
        var giftBox = $("#giftBox");
        giftBox.empty();
        for(var i=0; i<msg.info.giftList.length; i++){
          var gift = msg.info.giftList[i];
          var giftEntry = document.createElement('li');
          giftEntry.className = "list-group-item";
          giftEntry.innerHTML = gift.username+" send you a gift "+gift.giftID;
          giftBox.append(giftEntry);
        }
      }else{
        alert(username + JSON.stringify(msg));
      }
    },
    error: function(error){
      alert(JSON.stringify(error));
    }
  });
}

function logout(){
  localStorage.removeItem('userinfo');
  localStorage.removeItem('username');
  localStorage.removeItem('currentSession');
  localStorage.removeItem('isLoggedIn');
  location.reload();
}
