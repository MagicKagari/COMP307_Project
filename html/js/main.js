$(window).scroll(function() {
  if ($(document).scrollTop() > 50) {
    $('.title').animate({fontSize:"30px"},{ duration: 50, queue: false, complete: function() { $('.header').animate({height:"40px"},{ duration: 200, queue: false }); } });
    $('.header').animate({paddingTop:"4px"},{ duration: 100, queue: false });
    $('.sidebar').animate({marginTop:"-110px"},{ duration: 250, queue: false });
  } else {
  	$('.title').stop();
  	$('.header').stop();
  	$('.sidebar').stop();
  	$('.sidebar').animate({marginTop:"0px"},{ duration: 250, queue: false });
  	$('.header').animate({paddingTop:"40px"},{ duration: 100, queue: false });
  	$('.title').animate({fontSize:"60px"},{ duration: 50, queue: false });
  	$('.header').animate({height:"150px"},{ duration: 200, queue: false });
  }
});