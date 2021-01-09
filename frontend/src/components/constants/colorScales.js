import * as d3 from 'd3';

export const polarityScale = d3.scaleLinear()
    .domain([-1, 0, 1])
    .range(["red", "grey", "green"]);

export const subjectivityScale = d3.scaleLinear()
    .domain([0, 1])
    .range(["grey", "blue"]);

export const frequencyScale = d3.scaleLinear()
    .domain([0,1])
  	.range(["rgba(0,0,0,0)","rgba(0,0,0,1)"]);

export const colorScales = {
	"polarity": polarityScale,
	"subjectivity": subjectivityScale,
	"frequency": frequencyScale,
	// "partOfSpeech": partOfSpeechScale,
};