$scrolled = false;
$( document ).ready(function() {
  //***********************************************
  //Open pop up after add-to-cart button is clicked
  //*********************************************** 
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
    $(".username").animate({opacity:0},200,function(){$(".username").css("display","none");});
    $(".password").animate({opacity:0},200,function(){$(".password").css("display","none");});
    $(this).animate({opacity:0},200,function(){$(this).css("display","none");});
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
  });

  //*******************************************************************************
  //Animates Header to shrink if page is scrolled and enlarge if page is at the top
  //*******************************************************************************
  $(window).scroll(function() {
    if ($(document).scrollTop() > 50) {
      $scrolled = true;
      $('.title').animate({fontSize:"30px"},{ duration: 50, queue: false, complete: function() { $('.header').animate({height:"40px"},{ duration: 200, queue: false }); } });
      $('.header').animate({paddingTop:"4px"},{ duration: 100, queue: false });
      $('.sidebar').animate({marginTop:"-110px"},{ duration: 250, queue: false });
      $(".infoBox").animate({height:$(window).height()-100},50,function(){});
    } else {
      $scrolled = false;
      $('.title').stop();
      $('.header').stop();
      $('.sidebar').stop();
      $('.infoBox').stop();
      $('.sidebar').animate({marginTop:"0px"},{ duration: 250, queue: false });
      $('.header').animate({paddingTop:"40px"},{ duration: 100, queue: false });
      $('.title').animate({fontSize:"60px"},{ duration: 50, queue: false });
      $('.header').animate({height:"150px"},{ duration: 200, queue: false });
      $(".infoBox").animate({height:$(window).height()-210},400,function(){});

    }
  });
});
