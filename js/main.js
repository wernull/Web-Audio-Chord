
function setBgCheckerColors(h, s, l, numColors){
	for (var i = 0; i <= numColors; i++) {
		var hue = h + Math.floor(i*0.5);
		$('.checker'+i).css('background-color', 'hsla('+hue+', '+s+'%, '+l+'%, 1)');
	}
}

$(function(){
	//render checker background
	var checkers = '',
	numColors = 40,
	classNum = 1;

	for (var i = 0; i < 10000; i++) {
		checkers += '<div class="checker' + classNum + '"></div>';
		if(classNum < numColors){
			classNum++;
		}else{
			classNum = 1;
		}
	}
	$('.checker-bg').empty().append(checkers);

	setBgCheckerColors(203, 100, 50, numColors);
});

