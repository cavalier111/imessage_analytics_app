
$(document).ready(function(){
	$("#data").hide().fadeIn(2000);
	$('#vid').delay(2500).fadeIn('slow');
	setTimeout(function() {
  		$('#vid').delay(2500).get(0).play();
  	}, 3000);
	
	$("#weeklyGraph").hide();
	$('#vid').on('ended',function(){
		$(this).get(0).pause();
		
	  
});
});