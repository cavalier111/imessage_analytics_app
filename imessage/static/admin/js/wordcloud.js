
$(document).ready(function(){
	var frequencyList = JSON.parse(document.getElementById('frequency-list').textContent);
	// document.getElementById('canvas').width = window.innerWidth * .7;
	// document.getElementById('canvas').height = window.innerHeight * .7;;
	WordCloud(
		document.getElementById('canvas'),
		{
			list: frequencyList,
		  	gridSize: Math.round(5 * window.innerHeight / 1024),
			weightFactor: function (size) {
				return 200 * (size/frequencyList[0][1]);
			},
			origin: [Math.round(window.innerWidth/2)+600,Math.round(window.innerHeight/2)-400],
			fontFamily: 'Times, serif',
		 	rotateRatio: 0.5,
		  	rotationSteps: 2,
		  	backgroundColor: '#f2f2f2',
		  	hover: function (item, dimension, event) {
		  		const time = (item[1] == 1) ? " time" : " times";
		  		console.log(dimension);
				document.getElementById('count-box').innerHTML = item[0] + " was used " + item[1] +  time;
			},
		}
	);
	console.log('heyyyy', window.innerWidth);
});