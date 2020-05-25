var base = 500;

$(document).ready(function(){

	$('.piecompare').hide();
	$('#pieB').hide();

	setTimeout(function() {
  		$('#all').animate({opacity: 0.5}, 500).animate({opacity: 1}, 500)
  		}, base+2300);
	setTimeout(function() {
  		$('#pieA').hide();
		$('#pieB').show();
  		}, base+3000);

	// $('.piecompareB').delay(base+3200).fadeIn('slow');

	$('#Messages').delay(base+500).fadeIn('slow');
	$('#Texts').delay(base+800).fadeIn('slow');
	$('#Words').delay(base+1100).fadeIn('slow');
	$('#Emojis').delay(base+1400).fadeIn('slow');
	$('#Tapbacks').delay(base+1700).fadeIn('slow');
	$('#Images').delay(base+2000).fadeIn('slow');
	$('#Links').delay(base+2300).fadeIn('slow');
});
