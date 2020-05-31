
$(document).ready(function(){
	WordCloud(
		document.getElementById('canvas'),
		{
			list: JSON.parse(document.getElementById('frequency-list').textContent),
		  	gridSize: Math.round(16 * $('#canvas').width() / 1024),
			weightFactor: function (size) {
				return Math.pow(size, 5) * $('#canvas').width() / 1024;
			},
			fontFamily: 'Times, serif',
			  color: function (word, weight) {
			    return (weight === 500) ? '#f02222' : '#c09292';
			  },
			  rotateRatio: 0.5,
			  rotationSteps: 2,
			  backgroundColor: '#f2f2f2'
		}
		);
	console.log(document.getElementById('frequency-list').textContent);
});