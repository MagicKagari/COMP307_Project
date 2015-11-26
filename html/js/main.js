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
    var userid = 1; //TODO: get this one from login success result
    //use user id to query information
    $.ajax({
      url:"http://159.203.18.55:1337/node/members/getMemberInfo",
      //url:'http://localhost:1337/node/members/getMemberInfo',
      type:"POST",
      data: JSON.stringify({'userid':userid}),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(msg){
        var ret = msg.result;
        if(ret){
          alert(JSON.stringify(msg));
        }else{
          alert(msg.info);
        }
      },
      error: function(error){
        alert(JSON.stringify(error));
      }
    });
  });

  //*******************************************************************************
  //Animates Header to shrink if page is scrolled and enlarge if page is at the top
  //*******************************************************************************
  $(window).scroll(function() {
    if ($(document).scrollTop() > 80) {
      $scrolled = true;
      $('.title').animate({fontSize:"30px"},{ duration: 50, queue: false, complete: function() { $('.header').animate({height:"40px"},{ duration: 200, queue: false }); } });
      $('.header').animate({paddingTop:"4px"},{ duration: 100, queue: false });
      $('.sidebar').animate({marginTop:"-110px"},{ duration: 250, queue: false, complete: function(){
      } });
      $(".infoBox").animate({height:$(window).height()-100},50,function(){});
    } else{
      $scrolled = false;
      $('.title').stop();
      $('.header').stop();
      $('.sidebar').stop();
      $('.infoBox').stop();
      $('.sidebar').animate({marginTop:"0px"},{ duration: 250, queue: false, complete: function(){
      } });
      $('.header').animate({paddingTop:"40px"},{ duration: 100, queue: false });
      $('.title').animate({fontSize:"60px"},{ duration: 50, queue: false });
      $('.header').animate({height:"150px"},{ duration: 200, queue: false });
      $(".infoBox").animate({height:$(window).height()-210},200,function(){});

    }
  });
});
