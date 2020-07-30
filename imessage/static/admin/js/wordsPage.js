var vizOption,
	smallSize
$(document).ready(function() {
	if(JSON.parse(document.getElementById('frequency-list').textContent).length <= 10) {
		$('#topTen').prop('disabled', true);
		smallSize = true;
	}
	$("#barChart").hide();
	 	$(".form-check-input").click(() =>  {
		    vizOption = $("input[name='vizOption']:checked").val();
		    if (vizOption == "bargraph"){
		    	//hiding wordcloud
		    	$("#my_dataviz").hide();
		  		document.getElementById("tooltip").display = "none";
		  		zoom.transform(d3.select("#my_dataviz").select('svg'), d3.zoomIdentity.scale(1));
		  		wordcloud.selectAll("text").remove();

		  		//showing bar graph
				setZoomButton("#barChart", zoomObject);
				setSaveButton("#barChart", zoomObject, widthBar, heightBar);
				$("#topTen").show();
				$("#barChart").show();
				displayBars();
				if (smallSize) {
					$('#reset').prop('disabled', true);
				}
		    } else {
		    	// hiding bar graph
				$("#topTen").hide();
				 $("#barChart").hide();
				zoomObject.transform(d3.select("#barChart").select('svg'), d3.zoomIdentity.scale(1));
		  		document.getElementById("tooltipBar").display = "none";
				d3.selectAll(".bar").remove();

		    	// showing wordcloud
				$("#my_dataviz").show();
				$('#reset').prop('disabled', false);
		  		setZoomButton("#my_dataviz", zoom);
		  		setSaveButton("#my_dataviz", zoom, width, height);
				maxLayout
			.		on("end", (words) => draw(words,false))
					.start();
		    }
  	});

	function setZoomButton(id,zoomObject) {
		document.getElementById("reset").onclick = () => {
			zoomObject.transform(d3.select(id).select('svg'), d3.zoomIdentity.scale(1));
		}
	}
	setZoomButton("#my_dataviz", zoom);

	// reset the zoom and use html2canvas to download
	function setSaveButton(id, zoomObject, w, h) {
		document.getElementById("download").onclick = () => {
			zoomObject.transform(d3.select(id).select('svg'), d3.zoomIdentity.scale(1));
			html2canvas(
				document.querySelector(id),
				{ width: w, height: h, scale: "5", backgroundColor: "#f2f2f2"}
			).then(function(canvas) {
	        	saveAs(canvas.toDataURL(), "hey.png");
			});
		}
	}
	function saveAs(uri, filename) {
	    var link = document.createElement('a');
	    if (typeof link.download === 'string') {
	        link.href = uri;
	        link.download = filename;
	        document.body.appendChild(link)
	        link.click();
	        document.body.removeChild(link);

	    } else {
	        window.open(uri);
    	}
	}
	setSaveButton("#my_dataviz", zoom, width, height);
});