
$(document).ready(function(){
	// $("#header").hide();
	//  $("#data").hide();
	//  $("#nav").hide();
	//  $("#header").fadeIn(3000);
	//  $("#data").delay(4000).fadeIn(3000);
	//  $("#nav").delay(6000).fadeIn(3000);
	$('.tapmetric').hide();
		$('.taptitle').hide();
	$('#vid').hide();
	$("#resp").hide();

//   	$('video').height($(window).height());


$('#heart').animate({"margin-left": '-=1300px'}, 'slow');
$('#like').delay(500).animate({"margin-left": '-=1300px'}, 'slow');
$('#exclaim').delay(800).animate({"margin-left": '-=1300px'}, 'slow');
$('#haha').delay(1100).animate({"margin-left": '-=1290px'}, 'slow');
$('#dislike').delay(1400).animate({"margin-left": '-=1290px'}, 'slow');
$('#question').delay(1700).animate({"margin-left": '-=1290px'}, 'slow');
$('.tapmetric').delay(6000).fadeIn('slow');
$('.taptitle').delay(6000).fadeIn('slow');
$('#vid').delay(7000).fadeIn('slow');
	$('#vid').on('ended',function(){
		$(this).fadeOut("slow");
		$("#resp").fadeIn("slow");
	  
});

$('#myheart').delay(2000).animate({"margin-left": '-=1250px'}, 'slow');
$('#mylike').delay(2300).animate({"margin-left": '-=1250px'}, 'slow');
$('#myexclaim').delay(2600).animate({"margin-left": '-=1250px'}, 'slow');
$('#myhaha').delay(2900).animate({"margin-left": '-=1240px'}, 'slow');
$('#myquestion').delay(3200).animate({"margin-left": '-=1240px'}, 'slow');
$('#mydislike').delay(3500).animate({"margin-left": '-=1240px'}, 'slow');

$('#herheart').delay(3800).animate({"margin-left": '-=1200px'}, 'slow');
$('#herexclaim').delay(4100).animate({"margin-left": '-=1200px'}, 'slow');
$('#herlike').delay(4400).animate({"margin-left": '-=1200px'}, 'slow');
$('#herhaha').delay(4700).animate({"margin-left": '-=1200px'}, 'slow');
$('#herdislike').delay(5000).animate({"margin-left": '-=1190px'}, 'slow');
$('#herquestion').delay(5300).animate({"margin-left": '-=1190px'}, 'slow');
});