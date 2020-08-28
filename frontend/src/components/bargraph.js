import React, {Component} from 'react';
import './bargraph.css';
import * as d3 from 'd3';

class Bargraph extends Component {
    constructor(props) {
        super(props);
        this.dims = {
            margin: { top: 15, right: 30, bottom: 15, left: 300 },
        };
        this.dims.width = 1200 - this.dims.margin.left - this.dims.margin.right;
        this.dims.height = 400 - this.dims.margin.top - this.dims.margin.bottom;
    
        this.totalBars = Math.min(200,this.props.frequencyList.length)

        this.frequencyList = this.props.frequencyList.sort((a, b) => d3.descending(a.value, b.value)).slice(0,this.totalBars);
        this.frequencyList.reverse();

        this.maxWordSize = d3.max(this.frequencyList, d => d.value);

        this.zoomExtent = (this.frequencyList.length / 200) * 24;
        this.topTenZoom = (this.frequencyList.length / 200) * 22.5;
        console.log(this.frequencyList);
    }

    componentDidMount() {
        this.drawBarGraph();
        this.setUpTopTen();
    }

    drawBarGraph = () =>  {
        this.svg = d3.select("#bargraph").append("svg")
            .call((svg) => this.zoom(svg))
            .attr("width", this.dims.width + this.dims.margin.left + this.dims.margin.right)
            .attr("height", this.dims.height + this.dims.margin.top + this.dims.margin.bottom)
            .attr("id", "barSvg")
            .append("g")
            .attr("transform", "translate(" + this.dims.margin.left + "," + this.dims.margin.top + ")");


        this.tooltip = d3.select("body").append("div").attr("class", "toolTip").attr("id","tooltipBar");
        
        this.setUpAxes();
        // function to scale opacity with frequency
        this.opacity = d3.scaleLinear()
            .domain([0, this.maxWordSize])
            .range([.01,1]);

        this.bars = this.svg.selectAll(".bar")
            .data(this.frequencyList)
            .enter()
            .append("g")
            .attr("id", (d,i) => "bar" + i.toString())

        //add a text to the right of each bar to show count
        this.bars.append("text")
            .attr("class", "label")
            .attr('text-anchor', 'middle')
            .attr("y", (d) => this.y(d.text) + this.y.bandwidth() / 2 + 4)
            .attr("x", (d) => this.x(d.value) + 10)
            .style("opacity", 0)
            .style("pointer-events", "none")
            .text((d) => d.value);

        this.bars.on("mousemove", d => this.mouseMove(d));

        // for zoomed out view add a lebel for the highest frequency word
        d3.select("#bar" + (this.totalBars-1).toString()).append("text")
            .attr("id", "favorite")
            .attr('text-anchor', 'end')
            .style("opacity", 0)
            .style("pointer-events", "none")
            .attr("font-size", "20px")
            .attr("y", (d) => this.y(d.text) + this.y.bandwidth() / 2 + 4)
            .attr("x", (d) => 0)
            .text((d) => `Your favorite word: ${d.text} \u2933`);
        
        this.bars.append("rect")
            .attr("class", "bar")
            .attr("opacity", (d) => this.opacity(d.value))
            .attr("y", (d) =>  this.y(d.text))
            .attr("height", this.y.bandwidth())
            .attr("width", 0)
            .transition()
            .duration(1500)
            .delay((d,i) => i*10 )
            .attr("width", (d) => this.x(d.value))
            .attr("x", 0)
            .on('end', (d,i) =>  { 
              if(i==this.totalBars-1) {
                if (d3.select(".label").style('opacity') == 0) {
                  d3.select('#barSvg').select("#favorite").transition().duration(1500).style("opacity", 1);
                }
              }
            })
            ;

    }

    setUpAxes = () => {
        this.x = d3.scaleLinear()
            .range([0, this.dims.width])
            .domain([0, this.maxWordSize]);
        this.y = d3.scaleBand()
            .range([this.dims.height, 0])
            .domain(this.frequencyList.map((s) => s.text))
            .padding(0.3);

        // set up y axis, with no labeling at first
        this.yAxis = d3.axisLeft()
            .scale(this.y)
            .tickValues([])
            .tickSize(0);
        this.gy = this.svg.append("g")
            .attr("class", "y-axis")
            .call(this.yAxis);
    }

    mouseOverBar = (actual, i)  => {
        //hide all the labels
        d3.selectAll('.label').attr('visibility', "hidden");
        // make sure all bars are the standard size (prevent lagging previous mouseover)
        this.svg.selectAll(".bar").attr("y", d => this.y(d.text)).attr("height", this.y.bandwidth());

        // widen hovered bar, turn opacity down
        const currentElement= d3.select("#bar"+i.toString()).selectAll(".bar")["_groups"][0][0];
        d3.select(currentElement)
          // .transition()
          // .duration(300)
          .attr("opacity", (d) => .6 * this.opacity(d.value))
          .attr('y', (a) => this.y(a.text) - this.y.bandwidth()/2)
          .attr('height', this.y.bandwidth()*2)
          .attr("width", (d) => this.x(d.value));

        //add a the comparison line
        const lineLocation = this.x(actual.value);

        const line = this.svg.append('line')
          .attr('class', 'line')
          .attr('id', 'limit')
          .attr('x1', lineLocation)
          .attr('y1', 0)
          .attr('x2', lineLocation)
          .attr('y2', this.dims.height);


        // add text to each bar to show comparison of frequency against current
        this.bars.append('text')
          .attr('class', 'divergence')
          .attr('y', (a) => this.y(a.text) + this.y.bandwidth() / 2)
          .attr('x', (a) => this.x(a.value) + 15)
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

    mouseMove = (d) => {
        this.tooltip.style("left", d3.event.pageX+10+"px");
        this.tooltip.style("top", d3.event.pageY-25+"px");
        this.tooltip.style("display", "inline-block");
        this.tooltip.html((d.text) + " " + (d.value));
    }

    mouseLeaveBar = (actual, i, zoomed) => {
        //remove the tooltip, add back the labels
        this.tooltip.style("display", "none");
        d3.selectAll('.label').attr('visibility', "visible");
        
        // reset current element to it's normal state
        const currentElement= d3.select("#bar"+i.toString()).select(".bar")["_groups"][0][0];
        d3.select(currentElement)
          // .transition()
          // .duration(300)
          .attr("opacity", (d) => this.opacity(d.value))
          .attr("width", (d) => {
                return this.x(d.value);
        });
        if (zoomed){
          d3.select(currentElement)
            .attr('y', (a) => this.y(a.text))
            .attr('height', this.y.bandwidth());
        }

        //remove the line and comparison text
        this.svg.selectAll('#limit').remove();
        this.svg.selectAll('.divergence').remove();
          
    }


    zoom = (svg) => {
      const extent = [[this.dims.margin.left, this.dims.margin.top], [this.dims.width - this.dims.margin.right, this.dims.height - this.dims.margin.top]];
      this.zoomObject = d3.zoom()
        .scaleExtent([1, this.zoomExtent])
        .translateExtent(extent)
        .extent(extent)
        //when zooming/panning starts, disable mousover
        .on("start",  () => this.bars.on('mouseover', null ))
        //set timeout of zoom to accomadte delay of mouseover events
        // .on("zoom", () => setTimeout(zoomed(),300))
        .on("zoom", () => this.zoomed())
        //endable mouseover, if zoomed in enough and zooming has finished
        .on("end",() => {
          if (d3.zoomTransform(svg.node()).k > this.zoomExtent/2) {
            this.bars.on('mouseover', (actual, i) => this.mouseOverBar(actual, i) );
          }
        });
      svg.call(this.zoomObject); 
    }      


    zoomed = () => {
      //change the y function to fit the new rangw
      this.y.range([this.dims.height - this.dims.margin.top, this.dims.margin.bottom].map(d => d3.event.transform.applyY(d)));
      //edit the elements y location and height accordingly
      this.svg.selectAll(".bar").attr("y", d => this.y(d.text)).attr("height", this.y.bandwidth());
      this.svg.selectAll(".label").attr("y", d => this.y(d.text) + this.y.bandwidth() / 2 + 4);
      this.svg.select("#favorite").attr("y", d => this.y(d.text) + this.y.bandwidth() / 2 + 4);
      this.svg.selectAll(".divergence").attr("y", d => this.y(d.text) + this.y.bandwidth() / 2 + 4);

      //if zoomed in enought, display the y axis values, hide the favorite text
      if (d3.zoomTransform(this.svg.node()).k > this.zoomExtent/2) {
        this.yAxis = d3.axisLeft()
            .scale(this.y)
            .tickSize(0);
        this.svg.select("#favorite").style("opacity", 0);
        this.svg.selectAll(".label").style("opacity", 1);
        this.bars.on('mouseleave', (actual, i) => this.mouseLeaveBar(actual, i, true));
      } else {
        this.yAxis.tickValues([])
        this.svg.select("#favorite").style("opacity", 1);
        this.svg.selectAll(".label").style("opacity", 0);
        this.bars.on('mouseleave', (actual, i) => this.mouseLeaveBar(actual, i, false));
      }
      //update the y axis
      this.svg.selectAll(".y-axis").call(this.yAxis);
    }

    setUpTopTen = () => {
        document.getElementById("topTen").onclick = () => {
          this.zoomObject.transform(d3.select("#barChart").select('svg'), d3.zoomIdentity.scale(this.topTenZoom).translate(0, -this.dims.margin.top));
        }
    }

    render() {
        return (
            <div>
                 <div id="bargraph"></div>
            </div>
        );
    }
}

export default Bargraph;