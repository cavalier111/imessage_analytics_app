import React, {Component} from 'react';
import './wordcloud.css';
import * as d3 from 'd3';
import * as cloud from 'd3.layout.cloud'
import _ from 'lodash';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Button from 'react-bootstrap/Button';
import { connect } from "react-redux";
import { getFrequencyList, getDataType, getWordcloudLayout, getStyle } from "../redux/selectors/word";
import { updateWordcloudLayout, updateStyle } from "../redux/actions/word";
import equal from 'fast-deep-equal';
import { gradientColors } from './constants/colors';
import { colorScales } from './constants/colorScales';

const mapStateToProps = (state) => ({
  frequencyList: getFrequencyList(state),
  dataType: getDataType(state),
  wordcloudLayout: getWordcloudLayout(state),
  color: getStyle(state, 'color'),
  colorCodedBy: getStyle(state, 'colorCodedBy'),
  font: getStyle(state, 'font'),
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateWordcloudLayout: layout => dispatch(updateWordcloudLayout(layout)),
    updateStyle: payload => dispatch(updateStyle(payload)),
  };
}

class Wordcloud extends Component {
    constructor(props) {
        super(props);
        this.margin = {top: 20, right: 20, bottom: 40, left: 20};
        this.width = 1200 - this.margin.left - this.margin.right;
        this.height = 450 - this.margin.top - this.margin.bottom;
        this.maxLayout = cloud();
    }

    componentDidMount() { 
        this.startWordCloud();
    }

    componentDidUpdate(prevProps, prevState) {
        this.retrieveMaxLayout();
        if(prevProps.dataType !== this.props.dataType){
            d3.select("svg").remove();
            this.drawWordCloud();
        }
        if(!equal(prevProps.frequencyList, this.props.frequencyList)){
            d3.select("svg").remove();
            this.startWordCloud();
        }
        // clean this up (set a variable for what it will be filled by and inly have one this.wordcloud.selectAll(".word").style("fill",...)
        if(prevProps.colorCodedBy !== this.props.colorCodedBy){
            if(this.props.colorCodedBy == "none") {
                if(this.props.color =='rainbow') {
                    this.wordcloud.selectAll(".word").style("fill", (d, i) => this.fill(i));  
                } else {
                     this.wordcloud.selectAll(".word").style("fill", this.props.color);
                }
            } else {
                this.wordcloud.selectAll(".word").style("fill", (d, i) => colorScales[this.props.colorCodedBy](d[this.props.colorCodedBy]));
            }
        }
        if(prevProps.color !== this.props.color){
            if(this.props.color =='rainbow') {
                this.wordcloud.selectAll(".word").style("fill", (d, i) => this.fill(i));  
            }
        }
        if(prevProps.font !== this.props.font){
            this.wordcloud.selectAll(".word").style("font-family", this.props.font);
        }
    }

    startWordCloud = () =>  {
        // this.frequencyList = this.props.frequencyList.slice(10,200)
        const sizeThreshold = .05 * this.props.frequencyList[0].value;
        if (this.props.dataType == 'words'){
            this.frequencyList = this.props.frequencyList.filter(word => word.value > sizeThreshold).slice(0,500);
        } else {
            this.frequencyList = this.props.frequencyList;
        }
        this.drawWordCloud();
        // this.setState({ frequencyList: frequencyListFiltered }, ()=> this.drawWordCloud());
    
    }

    drawWordCloud = () => {
        this.svg = d3
            .select("#wordcloud")
            .append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
            .attr("id", "svg")
            .append("g");

        this.wordcloud = this.svg
            .append("g")
            .attr('className','wordcloud')
            .attr("transform", "translate(" + this.width/2 + "," + this.height/2 + ")");

        this.setToolTip();

        this.fill = d3.scaleOrdinal(d3.schemeCategory10);
        this.setUpLinearColorGrandient();

        this.retrieveMaxLayout();

        this.maxLayout
            .on("end", (words) => this.draw(words,true))
            .start();
    }

    setUpLinearColorGrandient = () => {
        //Container for the gradient
        const defs = this.svg.append("defs");
        //Append a linear horizontal gradient
        const linearGradient = defs.append("linearGradient")
            .attr("id","animate-gradient") //unique id for reference
            .attr("x1","0%")
            .attr("y1","0%")
            .attr("x2","1000%")
            .attr("y2","1000%")
            //Make sure the areas before 0% and after 100% (along the x)
            //are a mirror image of the gradient and not filled with the
            //color at 0% and 100%
            .attr("spreadMethod", "reflect");

        //Append the colors evenly along the gradient
        linearGradient.selectAll(".stop")
            .data(this.fill.range())
            .enter().append("stop")
            .attr("offset", (d,i) => i/(gradientColors.length-1))
            .attr("stop-color", (d) => d);

        const values = ['0%;2000%', '1000%;3000%'];
        const attributes = [['x1', values[0]], ['x2', values[1]], ['y1', values[0]], ['y2', values[1]]]
        attributes.forEach(attr =>
            linearGradient.append("animate")
                .attr("attributeName",attr[0])
                .attr("values",attr[1])
                .attr("dur","5s")
                .attr("repeatCount","0"),
        );
    }

    setToolTip = () => {
        this.tooltip = d3.select("body")
            .append("div")
            .attr("id", "tooltip")
            .attr("class", "wordTooltip");
    }

    draw = (words, colorAnimated) => {
        // $("#buttons").css("visibility","visible");
        const tooltip = this.tooltip;
        let data = this.wordcloud.selectAll("text")
            .data(words)
            .enter().append("text")
            .transition().duration(2000).attr("transform", function(t) {
                return "translate(" + [t.x, t.y] + ")rotate(" + t.rotate + ")"
                })
            .on('end', () => {
                 d3.selectAll("text")
                    .on("mouseover", d => {
                        const toolTipText = d.text + " was used " + d.value + " times";
                        tooltip.text(toolTipText); 
                        document.getElementById("tooltip").className = "tooltip";
                        return tooltip.style("display", "inline-block");
                    })
                    .on("mousemove", d => {
                        const tooltipWidth = document.getElementById('tooltip').offsetWidth;
                        return tooltip.style("top", (d3.event.pageY-45)+"px").style("left",(d3.event.pageX- tooltipWidth/2)+"px");
                    })
                    .on("mouseout", d => tooltip.style("display", "none"));
             })
            .attr('class','word')
            .attr('id', d => "cloud" + d.text)
            .style("font-size", d => d.size + "px")
            .style('font-family', this.props.font)
            .style("fill", (d,i) => colorAnimated ? "url(#animate-gradient)" : this.props.color =='rainbow' ? this.fill(i) : this.props.color)
            .attr("text-anchor", "middle")
            .attr("transform", d => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")")
            .text(d => d.text);

        if (colorAnimated) {
            setTimeout(() => { 
                this.wordcloud.selectAll(".word").style("fill", (d, i) =>  this.props.color =='rainbow' ? this.fill(i) : this.props.color)                
            }, 5000);
        }
    }

    retrieveMaxLayout = () => {
        if (this.props.wordcloudLayout){
            this.maxLayout = this.props.wordcloudLayout;
        } else {
            this.findMaxLayout(5,20);
            if (this.maxLayout) {
                 this.props.updateWordcloudLayout(this.maxLayout);
            }
        }
    }

    findMaxLayout = (max_font_size, incrementor) => {
        var maxSize = d3.max(this.frequencyList, d => d.value);
        var fontSizeScale = d3.scaleLinear().domain([0,1]).range([ 0, max_font_size]);
        const layout = cloud();
        layout
            .size([this.width, this.height])
            .words(this.frequencyList)
            .rotate(d => 0)
            .text(d => d.text) 
            .font('monospace')
            .fontSize(d => Math.floor(fontSizeScale(d.value/maxSize)))
            .spiral("archimedean")
        layout
            .on("end", (output) => {
                //if all the words are in the wordcliud output, the font is less than 100
                if ((this.frequencyList.length <= output.length) && (max_font_size < 106)) {  // compare between input ant output
                    // set the maximum sized layout to the current
                    this.maxLayout = layout;
                    // try drawing again with 5 bigger font size
                    return this.findMaxLayout(max_font_size + incrementor, incrementor);
                }
                else if(incrementor > 5) {
                    const incrementorSteps = {20: 10, 10: 5};
                    this.findMaxLayout(max_font_size - incrementor + incrementorSteps[incrementor], incrementorSteps[incrementor] );
                }
                //otherwise, max size has been found, return out
                else {
                    return undefined;
                }
            })
            .start()
    }



    render() {
        return (
            <div>
                 <TransformWrapper
                    defaultScale={1}
                    defaultPositionX={200}
                    defaultPositionY={100}
                    pan={{
                        velocity: true,
                        velocityEqualToMove: true,
                      }}
                      wheel = {{
                        step:35
                      }}
                  >
                    {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                      <React.Fragment>
                        <div className="tools">
                          <Button variant="outline-primary" className="rounded-circle zoomButton" onClick={zoomIn}>+</Button>
                          <Button variant="outline-primary" className="rounded-circle zoomButton" onClick={zoomOut}>-</Button>
                          <Button variant="outline-primary" className="rounded-circle zoomButton" onClick={resetTransform}>Reset</Button>
                        </div>
                        <TransformComponent>
                            <div id="wordcloud" style={{display: "flex", justifyContent: "center"}}></div>
                        </TransformComponent>
                      </React.Fragment>
                    )}
                  </TransformWrapper>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wordcloud);
