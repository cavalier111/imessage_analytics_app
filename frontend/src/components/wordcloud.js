import React, {Component} from 'react';
import './wordcloud.css';
import * as d3 from 'd3';
import * as cloud from 'd3.layout.cloud'

class Wordcloud extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.margin = {top: 20, right: 20, bottom: 40, left: 20};
        this.width = 1200 - this.margin.left - this.margin.right;
        this.height = 450 - this.margin.top - this.margin.bottom;
        this.maxLayout = cloud();
    }

    componentDidMount() {
        this.randomlyGenerate();
        this.drawWordCloud();
    }

    // componentWillUnmount() {
    //     // fix Warning: Can't perform a React state update on an unmounted component
    //     this.setState = (state,callback)=>{
    //         return;
    //     };
    // }


    drawWordCloud = () =>  {
        const svg = d3
            .select("#wordcloud")
            .append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
            .attr("id", "svg")
            // .call(zoom)
            .append("g");

        this.wordcloud = svg
            .append("g")
            .attr('className','wordcloud')
            .attr("transform", "translate(" + this.width/2 + "," + this.height/2 + ")");

        this.findMaxLayout(5);

        this.maxLayout
            .on("end", (words) => this.draw(words,true))
            .start();
    }

    draw = (words, colorAnimated) => {
        // $("#loader").hide();
        // $("#buttons").css("visibility","visible");
        // const tooltip = d3.select("#tooltip");
        let data = this.wordcloud.selectAll("text")
            .data(words)
            .enter().append("text")
            // .transition().duration(2000).attr("transform", function(t) {
            //     return "translate(" + [t.x, t.y] + ")rotate(" + t.rotate + ")"
            //     })
            // .on('end', function() {
            //      d3.selectAll("text")
            //         .on("mouseover", function(d){
            //             const toolTipText = d.text + " was used " + d.value + " times";
            //             tooltip.text(toolTipText); 
            //             document.getElementById("tooltip").className = "tooltip";
            //             return tooltip.style("display", "inline-block");
            //         })
            //         .on("mousemove", function(d){
            //             const tooltipWidth = document.getElementById('tooltip').offsetWidth;
            //             return tooltip.style("top", (d3.event.pageY-45)+"px").style("left",(d3.event.pageX- tooltipWidth/2)+"px");
            //         })
            //         .on("mouseout", function(){return tooltip.style("display", "none");});
            //  })
            .attr('class','word')
            .attr('id', d => "cloud" + d.text)
            .style("font-size", d => d.size + "px")
            .style('font-family', 'monospace')
            // .style("fill", (d,i) => colorAnimated ? "url(#animate-gradient)" : fill(i))
            .attr("text-anchor", "middle")
            .attr("transform", d => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")")
            .text(d => d.text);

        // if (colorAnimated) {
        //     setTimeout(() => { wordcloud.selectAll(".word").style("fill", (d, i) => fill(i))} ,5000);
        // }
    }

    findMaxLayout = (max_font_size) => {
        console.log('finding max layout', this.props.frequencyList);
        var maxSize = d3.max(this.props.frequencyList, d => d.value);
        var fontSizeScale = d3.scaleLinear().domain([0,1]).range([ 0, max_font_size]);
        const layout = cloud();
        layout
            .size([this.width, this.height])
            .words(this.props.frequencyList)
            .rotate(d => 0)
            .text(d => d.text) 
            .font('monospace')
            .fontSize(d => Math.floor(fontSizeScale(d.value/maxSize)))
            .spiral("archimedean")
        layout
            .on("end", (output) => {
                //if all the words are in the wordcliud output, the font is less than 100
                if ((this.props.frequencyList.length <= output.length) && (max_font_size < 100)) {  // compare between input ant output
                    // set the maximum sized layout to the current
                    this.maxLayout = layout;
                    // try drawing again with 5 bigger font size
                    return this.findMaxLayout(max_font_size + 5);
                }
                //otherwise, max size has been found, return out
                else {
                    return undefined;
                }
            })
            .start()
    }

    randomlyGenerate = () => {
        for (var i = 0; i <10; i++) { 
            this.props.frequencyList.push({"text":Math.random().toString(36).substring(3), value: Math.floor(Math.random() * 6)});
        }

    }


    render() {
        return (
            <div>
                <div id="wordcloud" style={{display: "flex", justifyContent: "center"}}></div>
            </div>
        );
    }
}

export default Wordcloud;