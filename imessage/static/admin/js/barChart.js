var zoomObject,
  bars,
  totalBars,
  opacity,
  x,
  y,
  zoomExtent,
  marginBar = {
      top: 15,
      right: 30,
      bottom: 15,
      left: 300
    },
  widthTotal = 1200,
  heightTotal = 400,
  widthBar = widthTotal - marginBar.left - marginBar.right,
  heightBar = heightTotal - marginBar.top - marginBar.bottom,
  svgBar;

$(document).ready(function(){
  var frequencyList = JSON.parse(document.getElementById('frequency-list').textContent);
    for (var i = 0; i <200; i++) { 
   frequencyList.push({"text":Math.random().toString(36).substring(3), value: Math.floor(Math.random() * 200)});
  }

  //get the total bars to display and sort
  totalBars = Math.min(200,frequencyList.length)
  frequencyList = frequencyList.sort((a, b) => d3.descending(a.value, b.value)).slice(0,totalBars);
  frequencyList.reverse();

  // set up zoom variables
  zoomExtent = (frequencyList.length / 200) * 24;
  var topTenZoom = (frequencyList.length / 200) * 22.5;

  //set up the svg
  svgBar = d3.select("#barChart").append("svg")
    .call(zoom)
    .attr("width", widthBar + marginBar.left + marginBar.right)
    .attr("height", heightBar + marginBar.top + marginBar.bottom)
    .attr("id", "barSvg")
    .append("g")
    .attr("transform", "translate(" + marginBar.left + "," + marginBar.top + ")")
  
  var tooltip = d3.select("body").append("div").attr("class", "toolTip").attr("id","tooltipBar");
  const maxSize = d3.max(frequencyList, function (d) {return d.value;});

  // functions for x and y domains
  x = d3.scaleLinear()
    .range([0, widthBar])
    .domain([0, maxSize]);

  y = d3.scaleBand()
    .range([heightBar, 0])
    .domain(frequencyList.map((s) => s.text))
    .padding(0.3)

  // set up y axis, with no labeling at first
  var yAxis = d3.axisLeft()
      .scale(y)
      .tickValues([])
      .tickSize(0);
  var gy = svgBar.append("g")
      .attr("class", "y-axis")
      .call(yAxis)

  // function to scale opacity with frequency
  opacity = d3.scaleLinear()
    .domain([0, maxSize])
    .range([.01,1]);

  // create the bars
  bars = svgBar.selectAll(".bar")
    .data(frequencyList)
    .enter()
    .append("g")
    .attr("id", (d,i) => "bar" + i.toString())


  //add a text to the right of each bar to show count
  bars.append("text")
    .attr("class", "label")
    .attr('text-anchor', 'middle')
    .attr("y", (d) => y(d.text) + y.bandwidth() / 2 + 4)
    .attr("x", (d) => x(d.value) + 10)
    .style("opacity", 0)
    .style("pointer-events", "none")
    .text((d) => d.value);

  // for zoomed out view add a lebel for the highest frequency word
  d3.select("#bar" + (totalBars-1).toString()).append("text")
    .attr("id", "favorite")
    .attr('text-anchor', 'end')
    .style("opacity", 0)
    .style("pointer-events", "none")
    .attr("font-size", "20px")
    .attr("y", (d) => y(d.text) + y.bandwidth() / 2 + 4)
    .attr("x", (d) => 0)
    .text((d) => `Your favorite word: ${d.text} \u2933`);

  function mouseOverBar(actual, i) {
    //hide all the labels
    d3.selectAll('.label').attr('visibility', "hidden");
    // make sure all bars are the standard size (prevent lagging previous mouseover)
    svgBar.selectAll(".bar").attr("y", d => y(d.text)).attr("height", y.bandwidth());

    // widen hovered bar, turn opacity down
    currentElement= d3.select("#bar"+i.toString()).selectAll(".bar")["_groups"][0][0];
    d3.select(currentElement)
      // .transition()
      // .duration(300)
      .attr("opacity", (d) => .6 * opacity(d.value))
      .attr('y', (a) => y(a.text) - y.bandwidth()/2)
      .attr('height', y.bandwidth()*2)
      .attr("width", (d) => x(d.value));

    //add a the comparison line
    const lineLocation = x(actual.value);

    line = svgBar.append('line')
      .attr('class', 'line')
      .attr('id', 'limit')
      .attr('x1', lineLocation)
      .attr('y1', 0)
      .attr('x2', lineLocation)
      .attr('y2', heightBar);


    // add text to each bar to show comparison of frequency against current
    bars.append('text')
      .attr('class', 'divergence')
      .attr('y', (a) => y(a.text) + y.bandwidth() / 2)
      .attr('x', (a) => x(a.value) + 15)
      .attr('text-anchor', 'middle')
      .style("pointer-events", "none")
      .text((a, idx) => {
        const divergence = (a.value - actual.value);
        let text = ''
        if (divergence > 0) text += '+'
        text += divergence
        return idx !== i ? text : '';
      })
  }

  //add the tooltip
  bars.on("mousemove", function(d){
    tooltip.style("left", d3.event.pageX+10+"px");
    tooltip.style("top", d3.event.pageY-25+"px");
    tooltip.style("display", "inline-block");
    tooltip.html((d.text) + " " + (d.value));
  });


  function mouseLeaveBar(actual, i, zoomed) {
    //remove the tooltip, add back the labels
    tooltip.style("display", "none");
    d3.selectAll('.label').attr('visibility', "visible");
    
    // reset current element to it's normal state
    currentElement= d3.select("#bar"+i.toString()).selectAll(".bar")["_groups"][0][0];
    d3.select(currentElement)
      // .transition()
      // .duration(300)
      .attr("opacity", (d) => opacity(d.value))
      .attr("width", function(d){
            return x(d.value);
    });
    if (zoomed){
      d3.select(currentElement)
        .attr('y', (a) => y(a.text))
        .attr('height', y.bandwidth());
    }

    //remove the line and comparison text
    svgBar.selectAll('#limit').remove();
    svgBar.selectAll('.divergence').remove();
          
  }



function zoom(svg) {
  const extent = [[marginBar.left, marginBar.top], [widthBar - marginBar.right, heightBar - marginBar.top]];
  zoomObject = d3.zoom()
    .scaleExtent([1, zoomExtent])
    .translateExtent(extent)
    .extent(extent)
    //when zooming/panning starts, disable mousover
    .on("start",  () => bars.on('mouseover', null ))
    //set timeout of zoom to accomadte delay of mouseover events
    // .on("zoom", () => setTimeout(zoomed(),300))
    .on("zoom", zoomed)
    //endable mouseover, if zoomed in enough and zooming has finished
    .on("end",() => {
      if (d3.zoomTransform(svg.node()).k > zoomExtent/2) {
        bars.on('mouseover', (actual, i) => mouseOverBar(actual, i) );
      }
    });
  svg.call(zoomObject);        


    function zoomed() {
      //change the y function to fit the new rangw
      y.range([heightBar - marginBar.top, marginBar.bottom].map(d => d3.event.transform.applyY(d)));
      //edit the elements y location and height accordingly
      svg.selectAll(".bar").attr("y", d => y(d.text)).attr("height", y.bandwidth());
      svg.selectAll(".label").attr("y", d => y(d.text) + y.bandwidth() / 2 + 4);
      svg.select("#favorite").attr("y", d => y(d.text) + y.bandwidth() / 2 + 4);
      svg.selectAll(".divergence").attr("y", d => y(d.text) + y.bandwidth() / 2 + 4);

      //if zoomed in enought, display the y axis values, hide the favorite text
      if (d3.zoomTransform(svg.node()).k > zoomExtent/2) {
          yAxis = d3.axisLeft()
              .scale(y)
              .tickSize(0);
        svg.select("#favorite").style("opacity", 0);
        svg.selectAll(".label").style("opacity", 1);
        bars.on('mouseleave', (actual, i) => mouseLeaveBar(actual, i, true));
      } else {
        yAxis.tickValues([])
        svg.select("#favorite").style("opacity", 1);
        svg.selectAll(".label").style("opacity", 0);
        bars.on('mouseleave', (actual, i) => mouseLeaveBar(actual, i, false));
      }
      //update the y axis
      svg.selectAll(".y-axis").call(yAxis);
    }
  }


  document.getElementById("topTen").onclick = () => {
      // const top = d`3.select("#bar199").selectAll(".bar")["_groups"][0][0];
      console.log(y.bandwidth());
      zoomObject.transform(d3.select("#barChart").select('svg'), d3.zoomIdentity.scale(topTenZoom).translate(0, -marginBar.top));
  }
});

function displayBars() {
  bars.append("rect")
    .attr("class", "bar")
    .attr("opacity", (d) => opacity(d.value))
    .attr("y", (d) =>  y(d.text))
    .attr("height", y.bandwidth())
    .attr("width", 0)
    .transition()
    .duration(1500)
    .delay((d,i) => i*10 )
    .attr("width", (d) => x(d.value))
    .attr("x", 0)
    .on('end', (d,i) =>  { 
      if(i==totalBars-1) {
        if (d3.select(".label").style('opacity') == 0) {
          d3.select('#barSvg').select("#favorite").transition().duration(1500).style("opacity", 1);
        }
      }
    });
}
