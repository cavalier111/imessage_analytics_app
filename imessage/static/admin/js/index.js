
$(document).ready(function(){
  	$('video').width($(window).width()*1.1);
  	$('video').height($(window).height()*1.1);
  	
	$("#vid").hide();
	$("#vid2").hide();
	$("#buttonsTwo").hide();
	$("#start").click(function() {
 		$("#buttonsOne").fadeOut("slow");
 		$("#vid").delay(300).fadeIn("slow");
 		$("#vid").get(0).play();
 		$('#vid').on('ended',function(){
 			$("#vid").fadeOut("slow");
			$("#vid2").delay(300).fadeIn("slow");
			$("#buttonsTwo").delay(300).fadeIn("slow");
 			$("#vid2").get(0).play();

		});
	});;

});

