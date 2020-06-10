
$(document).ready(function(){
	var frequencyList = JSON.parse(document.getElementById('frequency-list').textContent);
	// frequencyList.push([String.fromCodePoint(0x1F618), 44])
 // var frequencyList = [];
 // frequencyList.push({"text":"abcd", value: 1});
 //  frequencyList.push({"text":"abcd", value: 1});

 // frequencyList.push({"text":"abcd", value: 1});


 // frequencyList.push({"text":"abcd", value: 1});
 // frequencyList.push({"text":"abcd", value: 1});
 // frequencyList.push({"text":"abcd", value: 1});
 // frequencyList.push({"text":"abcd", value: 1});
 // frequencyList.push({"text":"abcd", value: 1});

	$("#canvas").mouseout(function(){
  		$(".count-box").tooltip('hide');
	});

	var margin = {top: 20, right: 20, bottom: 40, left: 20},
    width = 950 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

	var maxSize = d3.max(frequencyList, function (d) {return d.value;});
	var fontSizeScale = d3.scaleLinear().domain([0,1]).range([ 0, 100]);
	var expectedArea = d3.sum(frequencyList, function (d) {
		// console.log((d.text.length*(fontSizeScale(d.value/maxSize) * .6  * fontSizeScale(d.value/maxSize) * 1.15)));
		// const x =   (d.text.length*(fontSizeScale(d.value/maxSize) * .6  * fontSizeScale(d.value/maxSize) * 1.15));
		const x = .9 ** (-.00278 * (d.text.length*(fontSizeScale(d.value/maxSize) * .6  * fontSizeScale(d.value/maxSize) * 1.15)) -20);
		// console.log(x);
		return x;
	});
	// var expectedStd = d3.deviation(frequencyList, function (d) {return d.text.length*(fontSizeScale(d.value/maxSize) * .6  * fontSizeScale(d.value/maxSize) * 1.15)});
	var canvasSize = 950 * 450;
	var scaleVal =(canvasSize/expectedArea); // - (1/expectedStd)*300;
	// console.log(scaleVal, 1/expectedStd);
	scaleVal = scaleVal > 1 ? 1 : scaleVal;
  	var color = d3.scaleBand().range(["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854"]);
var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("background-color", "black")
    // .style("width", "120px")
    .style("color", "#fff")
    .style("text-align", "center")
    .style("border-radius", "6px")
    .style("padding", "5px 0")

  	var layout = d3.layout.cloud()
      .timeInterval(10)
      .size([width, height])
      .words(frequencyList)
      .rotate(function(d) { return 0; })
      .font('monospace')
      .fontSize(function (d) {
        return scaleVal * fontSizeScale(d.value/maxSize) ;
      })

      .spiral("archimedean")
      .on("end", draw)
      .start();

  	var svg = d3.select("#my_dataviz").append("svg")
  		.attr("width", width + margin.left + margin.right)
	 	.attr("height", height + margin.top + margin.bottom)
		.append("g")
	 	.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	          // .attr("transform", "translate(370,155)")
;

  	var wordcloud = svg.append("g")
      .attr('class','wordcloud')
      .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

	var fill = d3.scaleOrdinal(d3.schemeCategory20);

	function draw(words) {
	    wordcloud.selectAll("text")
	        .data(words)
	      	.enter().append("text")
	        .attr('class','word')
	        .style("font-size", function(d) { return d.size + "px"; })
	        .style("font-family", function(d) { return d.font; })
	       	.style("fill", (d, i) => fill(i))
	        .attr("text-anchor", "middle")
	        .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
	        .text(function(d) { return d.text; })
	        .on("mouseover", function(d){tooltip.text(d.text + " was used " + d.value + " times"); return tooltip.style("visibility", "visible");})
	      .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-40)+"px").style("left",(d3.event.pageX)+"px");})
	      .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
	  };


});