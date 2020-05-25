$(document).ready(function(){
	$('#subjectiveSection').hide();
		$('#polaritySection').hide();
	  	$( "#unfilteredSection" ).hide();
	$("#header").hide();
	 $("#data").hide();
	 $("#nav").hide();
	 $("#header").fadeIn(3000);
	 $("#data").delay(4000).fadeIn(3000);
	 $("#nav").delay(6000).fadeIn(3000);

	$( "#stop" ).click(function() {
		$( "#stopSection" ).show();
		$('#subjectiveSection').hide();
		$('#polaritySection').hide();
	  	$( "#unfilteredSection" ).hide();
	  	$("#filter").html("Filter: Stop Words");
	});
	$( "#unfiltered" ).click(function() {
		$( "#stopSection" ).hide();
		$('#subjectiveSection').hide();
		$('#polaritySection').hide();
	  	$( "#unfilteredSection" ).show();
	  	$("#filter").html("Filter: None");

	});
	$( "#polarity" ).click(function() {
		$( "#stopSection" ).hide();
		$('#subjectiveSection').hide();
		$('#polaritySection').show();
	  	$( "#unfilteredSection" ).hide();
	  	$("#filter").html("Filter: High Polarity");

	});
	$( "#subjectivity" ).click(function() {
		$( "#stopSection" ).hide();
		$('#subjectiveSection').show();
		$('#polaritySection').hide();
	  	$( "#unfilteredSection" ).hide();
	  	$("#filter").html("Filter: High Subjectivity");

	});
});