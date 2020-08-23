import React, {Component} from 'react';
import './bargraph.css';
import * as d3 from 'd3';

class Wordcloud extends Component {
    constructor(props) {
        super(props);
        this.margin = {top: 15, right: 30, bottom: 15, left: 300};
        this.width = 1200 - this.margin.left - this.margin.right;
        this.height = 450 - this.margin.top - this.margin.bottom;
        this.widthTotal = 1200;
        this.heightTotal = 400;
        this.width = this.widthTotal - this.marginBar.left - this.marginBar.right;
        this.height = this.heightTotal - this.marginBar.top - this.marginBar.bottom;
    }

    componentDidMount() {
        this.randomlyGenerate();
        this.drawBarGraph();
    }

    drawBarGraph = () =>  {
        this.totalBars = Math.min(200,this.props.frequencyList.length)
        this.frequencyList = this.props.frequencyList.sort((a, b) => d3.descending(a.value, b.value)).slice(0,totalBars);
        this.frequencyList.reverse();

        this.zoomExtent = (frequencyList.length / 200) * 24;
        this.topTenZoom = (frequencyList.length / 200) * 22.5;

        this.svg = d3.select("#bargraph").append("svg")
            .call(zoom)
            .attr("width", widthBar + marginBar.left + marginBar.right)
            .attr("height", heightBar + marginBar.top + marginBar.bottom)
            .attr("id", "barSvg")
            .append("g")
            .attr("transform", "translate(" + marginBar.left + "," + marginBar.top + ")");
    }

    randomlyGenerate = () => {
        for (var i = 0; i <100; i++) { 
            this.props.frequencyList.push({"text":Math.random().toString(36).substring(3), value: Math.floor(Math.random() * 6)});
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