import * as d3 from 'd3';


export const polarityColors = ["green", "grey", "red"];
export const subjectivityColors = ["blue", "grey"];
export const frequencyColors = ["blue", "grey"];

export const polarityScale = d3.scaleLinear()
    .domain([1, 0, -1])
    .range(polarityColors);

export const subjectivityScale = d3.scaleLinear()
    .domain([1, 0])
    .range(subjectivityColors);

export const frequencyScale = d3.scaleLinear()
    .domain([1,0])
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
	"polarity": {
		"colors": polarityColors,
		"topText": "Positive",
		"bottomText": "Negative",
	},
	"subjectivity": {
		"colors": subjectivityColors,
		"topText": "High subjectivity",
		"bottomText": "Low subjectivity",
	},
	"frequency": {
		"colors": frequencyColors,
		"topText": "Frequent",
		"bottomText": "Infrequent",
	},
	// "partOfSpeech": partOfSpeechColors,
};
