
$(document).ready(function(){
	var frequencyList = JSON.parse(document.getElementById('frequency-list').textContent);

	 // generating test data randomly
	// for (var i = 0; i <1000; i++) { 
	// 	frequencyList.push({"text":Math.random().toString(36).substring(3), value: Math.floor(Math.random() * 6)});
	// }

	//generating emoji test data randomly
	// var emojRange = [
	//   [128513, 128591], [9986, 10160], [128640, 128704]
	// ];
	// for (var i = 0; i < emojRange.length; i++) {
	//   var range = emojRange[i];
	//   for (var x = range[0]; x < range[1]; x++) {
	//   	frequencyList.push({"text":String.fromCodePoint("0x" + x.toString(16)), value: Math.floor(Math.random() * 50)});
	//   }
	// }
	//generating test data manually
 	// frequencyList.push({"text":"abcd", value: 50});
 	//set margins
	var margin = {top: 20, right: 20, bottom: 40, left: 20},
    width = 1200 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;


	function zoomed() {
	  svg.attr("transform", d3.event.transform)
	}
	var zoom = d3.zoom().on("zoom", zoomed);

    //set up svg
	var svg = d3.select("#my_dataviz").append("svg")
  		.attr("width", width + margin.left + margin.right)
	 	.attr("height", height + margin.top + margin.bottom)
	 	.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	 	.attr("id", "svg")
	 	.call(zoom)
		.append("g");

	//set up wordcloud
  	var wordcloud = svg.append("g")
      .attr('class','wordcloud')
      .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

	//function for text color 
	var fill = d3.scaleOrdinal(d3.schemeCategory20);

	//tooltip to show word count on hover

	var tooltip = d3.select("body")
	    .append("div")
	    .attr("id", "tooltip")
	    .style("position", "absolute")
	    .style("z-index", "10")
	    .style("visibility", "hidden")
	    .style("background-color", "#007bff")
	    // .style("width", "120px")
	    .style("color", "#fff")
	    .style("text-align", "center")
	    .style("border-radius", "6px")
	    .style("padding", "5px")
	   	.style("opacity", "1")

	var maxLayout;

	//recursive function to find maximum layout of cloud that fits all words
	function findMaxLayout(max_font_size) {
		var maxSize = d3.max(frequencyList, function (d) {return d.value;});
		var fontSizeScale = d3.scaleLinear().domain([0,1]).range([ 0, max_font_size]);
  		const layout = d3.layout.cloud();
  		layout
	        .size([width, height])
	      	.words(frequencyList)
      		.rotate(function(d) { return 0; })
       		.text(function(d) { return d.text; }) 
      		.font('monospace')
      		.fontSize(function (d) {
      			//fin how big the word is compared to the biggest, scale from 0 to max_font_size
      			return Math.floor(fontSizeScale(d.value/maxSize));
     		})
     		.spiral("archimedean")
      		.on("end", function(output) {
      			//if all the words are in the wordcliud output, the font is less than 100
	      		if ((frequencyList.length <= output.length) && (max_font_size < 100)) {  // compare between input ant output
			        // set the maximum sized layout to the current
			        maxLayout = layout;
			        // try drawing again with 5 bigger font size
			       	return findMaxLayout(max_font_size + 5);
	      		}
	      		//otherwise, max size has been found, return out
	       		else { 		
	       			return undefined;
	       		}
      		})
      		.start()
	}

	function draw(words) {
		$("#loader").hide();
		$("#buttons").css("visibility","visible");
	    let data = wordcloud.selectAll("text")
	        .data(words)
	      	.enter().append("text")
	      	.transition().duration(2000).attr("transform", function(t) {
        		return "translate(" + [t.x, t.y] + ")rotate(" + t.rotate + ")"
   			}).on('end', function() {
     			 d3.selectAll("text")
	     			.on("mouseover", function(d){
	     				const toolTipText = d.text + " was used " + d.value + " times";
	     				tooltip.text(toolTipText); 
	     				document.getElementById("tooltip").className = "tooltip";
	     				return tooltip.style("visibility", "visible");}
	     			)
			      	.on("mousemove", function(d){
						const tooltipWidth = document.getElementById('tooltip').offsetWidth;
			      		return tooltip.style("top", (d3.event.pageY-45)+"px").style("left",(d3.event.pageX- tooltipWidth/2)+"px");
			      	})
			      	.on("mouseout", function(){return tooltip.style("visibility", "hidden");});
		     })
	        .attr('class','word')
	        .style("font-size", function(d) { return d.size + "px"; })
			.style('font-family', 'monospace')
	       	.style("fill", (d, i) => fill(i))
	        .attr("text-anchor", "middle")
	        .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
	        .text(function(d) { return d.text; });
	  };

	findMaxLayout(5);

	maxLayout
		.on("end", draw)
		.start();


	// reset the zoom and use html2canvas to download
	document.getElementById("download").onclick = () => {
		zoom.transform(d3.select("#my_dataviz").select('svg'), d3.zoomIdentity.scale(1));
		html2canvas(
			document.querySelector("#my_dataviz"),
			{ width: width, height: height, scale: "5", backgroundColor: "#f2f2f2"}
		).then(function(canvas) {
        	saveAs(canvas.toDataURL(), 'MessagesWordCloud.png');
		});
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

	document.getElementById("reset").onclick = () => {
		zoom.transform(d3.select("#my_dataviz").select('svg'), d3.zoomIdentity.scale(1));
	}


});