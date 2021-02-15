import * as d3 from 'd3';


export const polarityColors = ["red", "grey", "green"];
export const subjectivityColors = ["grey", "blue"];
export const frequencyColors = ["grey", "blue"];

export const polarityScale = d3.scaleLinear()
    .domain([-1, 0, 1])
    .range(polarityColors);

export const subjectivityScale = d3.scaleLinear()
    .domain([0, 1])
    .range(subjectivityColors);

export const frequencyScale = d3.scaleLinear()
    .domain([0,1])
  	.range(frequencyColors);

export const colorScales = {
	words: {
		"polarity": polarityScale,
		"subjectivity": subjectivityScale,
		"frequency": frequencyScale,
		// "partOfSpeech": partOfSpeechScale,
	},
	emojis: {
		"polarity": polarityScale,
		"subjectivity": subjectivityScale,
		"frequency": frequencyScale,
	},
	links: {
		"frequency": frequencyScale,
	}
};
export const colorArrays = {
	"polarity": polarityColors,
	"subjectivity": subjectivityColors,
	"frequency": frequencyColors,
	// "partOfSpeech": partOfSpeechColors,
};
