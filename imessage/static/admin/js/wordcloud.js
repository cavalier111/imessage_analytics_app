
var zoom,
	wordcloud,
	maxLayout,
	fill,
	linearGradient,
	frequencyList,
	margin = {top: 20, right: 20, bottom: 40, left: 20},
	width = 1200 - margin.left - margin.right,
	height = 450 - margin.top - margin.bottom;

$(document).ready(function(){
	frequencyList = JSON.parse(document.getElementById('frequency-list').textContent);
	window.onload = function() {
		document.getElementById("totalWords").textContent = frequencyList.length;			
	}
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



	zoom = d3.zoom().on("zoom", zoomed);
	function zoomed() {
	  svg.attr("transform", d3.event.transform)

	}

    //set up svg
	var svg = d3.select("#my_dataviz").append("svg")
  		.attr("width", width + margin.left + margin.right)
	 	.attr("height", height + margin.top + margin.bottom)
	 	.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	 	.attr("id", "svg")
	 	.call(zoom)
		.append("g");

	//set up wordcloud
  	wordcloud = svg.append("g")
      .attr('class','wordcloud')
      .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

	//function for text color 

	// fill = d3.scaleOrdinal(d3.schemeCategory20);
	fill = d3.scaleOrdinal(d3.schemeCategory10);
	console.log(fill.range());
	//Container for the gradient
	var defs = svg.append("defs");
	//Append a linear horizontal gradient
	linearGradient = defs.append("linearGradient")
	    .attr("id","animate-gradient") //unique id for reference
	    .attr("x1","0%")
	    .attr("y1","0%")
	    .attr("x2","1000%")
	    .attr("y2","1000%")
	    //Make sure the areas before 0% and after 100% (along the x)
	    //are a mirror image of the gradient and not filled with the
	    //color at 0% and 100%
	    .attr("spreadMethod", "reflect");

	// var colours = [
	// // '#FF6633', '#FFB399','#3366E6', '#999966', '#4DB380', '#FF4D4D',
	// 	  "#ff0000", "#ffa500", "#ffff00","#008000" ,"#0000ff" ,"#4b0082", "#ee82ee"
	// ];

	var colours = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
	var randomColors = [];
	for (var i = 0; i <7; i++) {
		randomColors.push(colours[Math.floor(Math.random()*colours.length)]);
	}

	//Append the colors evenly along the gradient
	linearGradient.selectAll(".stop")
	    .data(fill.range())
	    .enter().append("stop")
	    .attr("offset", function(d,i) { return i/(randomColors.length-1); })
	    .attr("stop-color", function(d) { return d; });
	linearGradient.append("animate")
	    .attr("attributeName","x1")
	    .attr("values","0%;2000%")
	    .attr("dur","5s")
	    .attr("repeatCount","0");
	linearGradient.append("animate")
	    .attr("attributeName","x2")
	    .attr("values","1000%;3000%")
	    .attr("dur","5s")
	    .attr("repeatCount","0");

	linearGradient.append("animate")
	    .attr("attributeName","y1")
	    .attr("values","0%;2000%")
	    .attr("dur","5s")
	    .attr("repeatCount","0");
	linearGradient.append("animate")
	    .attr("attributeName","y2")
	    .attr("values","1000%;3000%")
	    .attr("dur","5s")
	    .attr("repeatCount","0");


	//tooltip to show word count on hover

	var tooltip = d3.select("body")
	    .append("div")
	    .attr("id", "tooltip")
	    .style("position", "absolute")
	    .style("z-index", "10")
    	.style("display", "none")
	    .style("background-color", "#007bff")
	    // .style("width", "120px")
	    .style("color", "#fff")
	    .style("text-align", "center")
	    .style("border-radius", "6px")
	    .style("padding", "5px")
	   	.style("opacity", "1")

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

	findMaxLayout(5);

	maxLayout
		.on("end", (words) => draw(words,true))
		.start();
});


function searchWords() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("searchBar");
    filter = input.value.toLowerCase();
    const results = fuzzysort.go(filter, frequencyList , {key:'text'});
    results.forEach(result => {
    	// Create Lis for search results
		// var linkNode = document.createElement("a");         
		// var node = document.createElement("LI");   
		// node.appendChild(linkNode);
		// node.style.display = "none";
		// var textnode = document.createTextNode("hey");         
		// linkNode.appendChild(textnode);
		// document.getElementById("myUL").appendChild(node);
	});

	// first result and on click will have glow effect:
	// const desiredElement = document.getElementById("cloudhey");	  
	// desiredElement.classList.add("glow_animation");
}


function draw(words, colorAnimated) {
	$("#loader").hide();
	$("#buttons").css("visibility","visible");
	const tooltip = d3.select("#tooltip");
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
     				return tooltip.style("display", "inline-block");
     			})
		      	.on("mousemove", function(d){
					const tooltipWidth = document.getElementById('tooltip').offsetWidth;
		      		return tooltip.style("top", (d3.event.pageY-45)+"px").style("left",(d3.event.pageX- tooltipWidth/2)+"px");
		      	})
		      	.on("mouseout", function(){return tooltip.style("display", "none");});
	     })
        .attr('class','word')
        .attr('id', (d) => "cloud" + d.text)
        .style("font-size", function(d) { return d.size + "px"; })
		.style('font-family', 'monospace')
		.style("fill", (d,i) => colorAnimated ? "url(#animate-gradient)" : fill(i))
        .attr("text-anchor", "middle")
        .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
        .text(function(d) { return d.text; });

    if (colorAnimated) {
    	setTimeout(() => { wordcloud.selectAll(".word").style("fill", (d, i) => fill(i))} ,5000);
  	}
  };