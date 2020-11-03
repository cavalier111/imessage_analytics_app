import * as cloud from 'd3.layout.cloud'
import * as d3 from 'd3';

// function findLayout(max_font_size) {
// 	console.log('finding layout');
//     var maxSize = d3.max(frequencyList, d => d.value);
//     var fontSizeScale = d3.scaleLinear().domain([0,1]).range([ 0, max_font_size]);
//     const layout = cloud();
//     layout
//         .size([width, height])
//         .words(frequencyList)
//         .rotate(d => 0)
//         .text(d => d.text) 
//         .font('monospace')
//         .fontSize(d => Math.floor(fontSizeScale(d.value/maxSize)))
//         .spiral("archimedean")
//     layout
//         .on("end", (output) => {
//             //if all the words are in the wordcliud output, the font is less than 100
//             if ((frequencyList.length <= output.length) && (max_font_size < 100)) {  // compare between input ant output
//                 // set the maximum sized layout to the current
//                 maxLayout = layout;
//                 // try drawing again with 5 bigger font size
//                 return findLayout(max_font_size + 5);
//             }
//             //otherwise, max size has been found, return out
//             else {
//                 return undefined;
//             }
//         })
//         .start()
// }

const WordCloudService = {
	findMaxLayout: function(frequencyListUnfiltered) {
		const sizeThreshold = .05 * frequencyListUnfiltered[0].value;
        const frequencyList = frequencyListUnfiltered.filter(word => word.value > sizeThreshold).slice(0,700);
		console.log('finding max layout');
		const margin = {top: 20, right: 20, bottom: 40, left: 20};
        const width = 1200 - margin.left - margin.right;
        const height = 450 - margin.top - margin.bottom;
		let maxLayout;
		const findLayout = (max_font_size) => {
			console.log('finding layout', frequencyList, max_font_size);
		    var maxSize = d3.max(frequencyList, d => d.value);
		    var fontSizeScale = d3.scaleLinear().domain([0,1]).range([ 0, max_font_size]);
		    const layout = cloud();
		    layout
		        .size([width, height])
		        .words(frequencyList)
		        .rotate(d => 0)
		        .text(d => d.text) 
		        .font('monospace')
		        .fontSize(d => Math.floor(fontSizeScale(d.value/maxSize)))
		        .spiral("archimedean")
		    layout
		        .on("end", (output) => {
		        	console.log('output', output);
		            //if all the words are in the wordcliud output, the font is less than 100
		            if ((frequencyList.length <= output.length) && (max_font_size < 100)) {  // compare between input ant output
		                // set the maximum sized layout to the current
		                maxLayout = layout;
		                // try drawing again with 5 bigger font size
		                return findLayout(max_font_size + 5);
		            }
		            //otherwise, max size has been found, return out
		            else {
		                return undefined;
		            }
		        })
		        .start()
		}
		findLayout(5);
		console.log('found max', maxLayout);
		return maxLayout;
	}
}

export default WordCloudService;